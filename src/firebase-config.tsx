// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbWLQTFqUlgV_hE9NYAvnvKqYn5_gM4i8",
    authDomain: "chaeum-a444b.firebaseapp.com",
    databaseURL: "https://chaeum-a444b-default-rtdb.firebaseio.com",
    projectId: "chaeum-a444b",
    storageBucket: "chaeum-a444b.appspot.com",
    messagingSenderId: "142246824736",
    appId: "1:142246824736:web:d5fa62bf458a8f27132545",
    measurementId: "G-D2R1SZYERQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
