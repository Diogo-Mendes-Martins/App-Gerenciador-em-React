// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDC4SyalzmJslcGyomkWZc3DMavNgaEmQw",
    authDomain: "appgerenciador-98ed4.firebaseapp.com",
    projectId: "appgerenciador-98ed4",
    storageBucket: "appgerenciador-98ed4.firebasestorage.app",
    messagingSenderId: "240313087443",
    appId: "1:240313087443:web:5beeb6c93477171c892b26",
    measurementId: "G-YKBN4MM0NK"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc };
