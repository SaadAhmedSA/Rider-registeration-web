import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBCvi6-VvtAShDwZn1oDub_bmzz5sJwSDU",
  authDomain: "indrive-e5332.firebaseapp.com",
  projectId: "indrive-e5332",
  storageBucket: "indrive-e5332.firebasestorage.app",
  messagingSenderId: "38378612116",
  appId: "1:38378612116:web:e5641666476534b983db81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)