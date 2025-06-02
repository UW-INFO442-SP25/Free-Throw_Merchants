import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC19RdIeCI4caPj0PHsBSFyVy0AQQJV9eo",
  authDomain: "foodsaver-8678f.firebaseapp.com",
  projectId: "foodsaver-8678f",
  storageBucket: "foodsaver-8678f.appspot.com",  
  messagingSenderId: "443260493654",
  appId: "1:443260493654:web:63bd2bf39d0996021c80f7",
  databaseURL: "https://foodsaver-8678f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
export const storage = getStorage(app);

export { auth, db };
export default app;
