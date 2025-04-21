// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC19RdIeCI4caPj0PHsBSFyVy0AQQJV9eo",
  authDomain: "foodsaver-8678f.firebaseapp.com",
  projectId: "foodsaver-8678f",
  storageBucket: "foodsaver-8678f.firebasestorage.app",
  messagingSenderId: "443260493654",
  appId: "1:443260493654:web:63bd2bf39d0996021c80f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

const db = getDatabase();