// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSHDjHnx_ShxPh_EP7zQV40VE6sdLgIJk",
  authDomain: "riskymap-93a25.firebaseapp.com",
  projectId: "riskymap-93a25",
  storageBucket: "riskymap-93a25.appspot.com",
  messagingSenderId: "579378733038",
  appId: "1:579378733038:web:1d220d6a0e2eea76aa38ff"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);