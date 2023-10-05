// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOELdA4gB7wtCsm9LIEIgo8kakW4WeWRQ",
  authDomain: "next-auth-384f9.firebaseapp.com",
  projectId: "next-auth-384f9",
  storageBucket: "next-auth-384f9.appspot.com",
  messagingSenderId: "880689709743",
  appId: "1:880689709743:web:fc770d56e0efbb6a1b4a5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const customAuth = getAuth();