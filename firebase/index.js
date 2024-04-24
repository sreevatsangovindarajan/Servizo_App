import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7QGzzKIp3dWwx_htm7oYqBi33CA9vqrE",
  authDomain: "homehub-connect-2a4a4.firebaseapp.com",
  projectId: "homehub-connect-2a4a4",
  storageBucket: "homehub-connect-2a4a4.appspot.com",
  messagingSenderId: "1069468436233",
  appId: "1:1069468436233:web:feeca1316d9c7d7af0b5d8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db, storage };
