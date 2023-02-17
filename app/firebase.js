// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR8sAUjOs_20_jRUgUqWvOqA_dCzR3woM",
  authDomain: "rpfurnituredev.firebaseapp.com",
  projectId: "rpfurnituredev",
  storageBucket: "rpfurnituredev.appspot.com",
  messagingSenderId: "209019524662",
  appId: "1:209019524662:web:48d53e385ef310c2b72a97",
  measurementId: "G-919NLERSWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export default app;