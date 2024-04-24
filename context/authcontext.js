import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { allServices } from "../constants";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const [loading, setLoading] = useState(true);

  const [services, setServices] = useState(allServices);

  const [bookings, setBookings] = useState([]);

  // Listen for user authentication changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("🔥 User In => ", user.email);

        setIsAuthenticated(true);
        setUser({ ...user, id: user.uid });
        fetchUser(user.uid);
      } else {
        console.log("😓 Not Auth");

        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const querySnapshot = collection(db, "users", user.id, "bookings");

    const unsub = onSnapshot(querySnapshot, (snapshot) => {
      const bookings = [];
      snapshot.forEach((doc) => {
        bookings.push({ ...doc.data(), id: doc.id });
      });
      setBookings(bookings);
    });
    return () => {
      unsub();
    };
  }, [user]);

  // Sign up a new user
  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🔥 New User => ", response?.user);
      // create a new user in the database with the response.user.uid if you want more details
      await setDoc(doc(db, "users", response?.user.uid), {
        email,
        id: response?.user.uid,
        username: email.split("@")[0],
        profileUrl: "https://picsum.photos/seed/11/3000/2000",
      });
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign in an existing user
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign out the current user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  //password reset function firebase

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  const fetchUser = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
      if (docSnap.data().liked) {
        const likedArrary = docSnap.data().liked;
        const likedServices = allServices.map((service) => {
          if (likedArrary.includes(service.id)) {
            service.liked = true;
          }
          return service;
        });
        setServices(likedServices);
      }
    } else {
      // doc.data() will be undefined in this case
      console.error("No such document!");
    }
  };
  const updateLikedList = (id, state) => {
    setServices((oldData) =>
      oldData.map((service) => {
        {
          if (service.id === id) {
            service.liked = state;
          }
          return service;
        }
      })
    );
  };
  const authContextValue = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    resetPassword,
    services,
    updateLikedList,
    bookings,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return value;
};

const handleFirebaseError = (error) => {
  console.error(error);
  let msg = error.message;
  if (msg.includes("auth/email-already-in-use")) {
    msg = "Email already in use";
  } else if (msg.includes("auth/invalid-email")) {
    msg = "Invalid email";
  } else if (msg.includes("auth/weak-password")) {
    msg = "Password should be at least 6 characters";
  } else if (msg.includes("auth/user-not-found")) {
    msg = "User not found";
  } else if (msg.includes("auth/wrong-password")) {
    msg = "Wrong password";
  } else if (msg.includes("auth/too-many-requests")) {
    msg = "Too many requests, please try again later";
  } else if (msg.includes("auth/network-request-failed")) {
    msg = "Network request failed, please try again later";
  }

  return msg;
};
