import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDZOWWOFyaA3MT5PCSqNIaWPBumk2nxRI4",
  authDomain: "crypto-mice.firebaseapp.com",
  projectId: "crypto-mice",
  storageBucket: "crypto-mice.appspot.com",
  messagingSenderId: "339489071267",
  appId: "1:339489071267:web:984d173ace726d82e51f16",
  measurementId: "G-DZ3Z2JKZPG"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseConnection = () => app
const auth = getAuth()

export {firebaseConnection, auth}