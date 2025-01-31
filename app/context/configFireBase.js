import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAZ9h345BYyT5SR35E39SJU6EyQ5vDNK5k",
    authDomain: "proyecto-react-97432.firebaseapp.com",
    projectId: "proyecto-react-97432",
    storageBucket: "proyecto-react-97432.firebasestorage.app",
    messagingSenderId: "1067418975927",
    appId: "1:1067418975927:web:de0a66cc6d4a89cc0b9732"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
