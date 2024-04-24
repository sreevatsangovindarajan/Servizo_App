import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addToLikedList = async (postId, id) => {
  try {
    const userRef = doc(db, "users", id);
    // add this postId to the liked list of the user its an array
    await updateDoc(userRef, {
      liked: arrayUnion(postId),
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
export const removeFromLiked = async (postId, id) => {
  try {
    const userRef = doc(db, "users", id);
    // add this postId to the liked list of the user its an array
    await updateDoc(userRef, {
      liked: arrayRemove(postId),
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

export const addBooking = async (bookingData, userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const bookingsRef = collection(userRef, "bookings");

    // Add the booking data to the bookings collection
    await addDoc(bookingsRef, { ...bookingData });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

// update the booking status to completed
export const updateBooking = async (bookingId, userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    const bookingsRef = collection(userRef, "bookings");
    const bookingRef = doc(bookingsRef, bookingId);

    await updateDoc(bookingRef, {
      ...data,
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
export const saveProfileUrl = async (id, url) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      profileUrl: url,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
