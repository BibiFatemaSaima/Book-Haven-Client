// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvbOFuGMewc8clXdTJ0ItbwrB_qNFBULE",
  authDomain: "book-haven-firebase-auth.firebaseapp.com",
  projectId: "book-haven-firebase-auth",
  storageBucket: "book-haven-firebase-auth.firebasestorage.app",
  messagingSenderId: "284256573438",
  appId: "1:284256573438:web:d09f5cc7a68de798e592af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
