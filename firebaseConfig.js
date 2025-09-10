import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoT9HF6lcdzV-7-OnimfRNARg8-XlSx0w",
  authDomain: "food-app-281ab.firebaseapp.com",
  databaseURL: "https://food-app-281ab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-app-281ab",
  storageBucket: "food-app-281ab.firebasestorage.app",
  messagingSenderId: "140340037224",
  appId: "1:140340037224:web:940c990a3aed681b7adddd",
};

// Check if Firebase app already initialized or not
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth only once
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Database
const db = getDatabase(app);

export { auth, db };
