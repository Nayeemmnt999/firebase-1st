// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ_7aKQo6N89rrOEJa7nrUo3AgV-n3WrA",
  authDomain: "simple-firebase-facebook.firebaseapp.com",
  projectId: "simple-firebase-facebook",
  storageBucket: "simple-firebase-facebook.appspot.com",
  messagingSenderId: "846086837757",
  appId: "1:846086837757:web:b60f72a138f0dddcf33594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;