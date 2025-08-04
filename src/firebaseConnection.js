import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDgjzmX_uk3As4FKIyriO70z_QC8b_9d1Q",
  authDomain: "fabrica-apps-3010f.firebaseapp.com",
  projectId: "fabrica-apps-3010f",
  storageBucket: "fabrica-apps-3010f.firebasestorage.app",
  messagingSenderId: "580280436421",
  appId: "1:580280436421:web:e15aa92265d7d14326d2ac",
  measurementId: "G-2TN32ZX37F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };