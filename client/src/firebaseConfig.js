import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAp1IwI5lIyzyRm1Uv9MAPkQ3x43SGksWM", // these are public, protections come from the firebase rules
  authDomain: "opensense-b7275.firebaseapp.com",
  databaseURL: "https://opensense-b7275-default-rtdb.firebaseio.com",
  projectId: "opensense-b7275",
  storageBucket: "opensense-b7275.firebasestorage.app",
  messagingSenderId: "385405466267",
  appId: "1:385405466267:web:71f3d3d43d06618bc5b83e",
  measurementId: "G-E6XM4SXWD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export an instance of Realtime Database
export const db = getDatabase(app);