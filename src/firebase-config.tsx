// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCT88ZZHjDbCz29SN4o6R13y0bHZ9LVIcc",
    authDomain: "chaeum-temporary.firebaseapp.com",
    projectId: "chaeum-temporary",
    storageBucket: "chaeum-temporary.appspot.com",
    messagingSenderId: "200276100577",
    appId: "1:200276100577:web:f756680ebb726b36fffea0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
