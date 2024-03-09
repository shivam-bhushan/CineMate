// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBllS__a5MrvYBNjg9mwf8NAcgEre59kyE",
  authDomain: "cinemate1-33ed2.firebaseapp.com",
  projectId: "cinemate1-33ed2",
  storageBucket: "cinemate1-33ed2.appspot.com",
  messagingSenderId: "340035324609",
  appId: "1:340035324609:web:01aaf91bc6d029c1c02240"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);