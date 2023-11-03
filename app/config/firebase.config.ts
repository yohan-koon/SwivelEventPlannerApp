// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn7CyxdKldlUnPU9gJ_OzmRW4AU1WI5-Q",
  authDomain: "swivel-event-planner.firebaseapp.com",
  projectId: "swivel-event-planner",
  storageBucket: "swivel-event-planner.appspot.com",
  messagingSenderId: "759002095689",
  appId: "1:759002095689:web:f7521334c30f2f1b8a9f98",
  databaseURL: "https://swivel-event-planner-default-rtdb.firebaseio.com/",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
