import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "voice-ai-ee7d3.firebaseapp.com",
  projectId: "voice-ai-ee7d3",
  storageBucket: "voice-ai-ee7d3.firebasestorage.app",
  messagingSenderId: "812897814252",
  appId: "1:812897814252:web:3a5de18d0027fa36d2c7c9",
  measurementId: "G-3115T8LBN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}

