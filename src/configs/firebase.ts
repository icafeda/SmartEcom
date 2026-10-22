import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDeQmQZpBuWaI9VA8ZFc3HBGOPE709BmGk",
  authDomain: "smart-e-commerce-8f7c9.firebaseapp.com",
  projectId: "smart-e-commerce-8f7c9",
  storageBucket: "smart-e-commerce-8f7c9.firebasestorage.app",
  messagingSenderId: "562939964537",
  appId: "1:562939964537:web:6a8f81b29133f0f638f8a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
