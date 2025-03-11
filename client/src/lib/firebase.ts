import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOGks1FE2e4qlx0nibv-CPGuu676LfRFs",
  authDomain: "ayayaya-f8483.firebaseapp.com",
  projectId: "ayayaya-f8483",
  storageBucket: "ayayaya-f8483.firebasestorage.app",
  messagingSenderId: "462012309712",
  appId: "1:462012309712:web:96b1cb86d212e451b13ed5",
  measurementId: "G-MXSWNS321B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};