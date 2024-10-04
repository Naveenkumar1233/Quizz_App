// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Authentications purpose --> email,password,google,facebook
import { getFirestore } from "firebase/firestore"; //Storing the data --> database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB82FjfOFr2D4emgg0U0AwHYNLWJlKqKPU",
  authDomain: "quizapp-b332c.firebaseapp.com",
  projectId: "quizapp-b332c",
  storageBucket: "quizapp-b332c.appspot.com",
  messagingSenderId: "830865047833",
  appId: "1:830865047833:web:579ca68002f9b5b4124588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);