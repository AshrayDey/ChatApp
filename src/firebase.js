// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxFjihvhnfEvCyzrOVN6JzL8Eepx094WE",
  authDomain: "chat-app-4f389.firebaseapp.com",
  projectId: "chat-app-4f389",
  storageBucket: "chat-app-4f389.appspot.com",
  messagingSenderId: "838089192308",
  appId: "1:838089192308:web:51a02a71b341e9851f7221"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);