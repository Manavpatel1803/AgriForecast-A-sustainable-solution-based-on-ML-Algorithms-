// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCrZOCIKehOj0eRwtK_aUzXzhGBsKbyu9Q",
  authDomain: "fir-auth-5d8c9.firebaseapp.com",
  projectId: "fir-auth-5d8c9",
  storageBucket: "fir-auth-5d8c9.appspot.com",
  messagingSenderId: "1077326266757",
  appId: "1:1077326266757:web:ba31340eae3598b33604ec",
  measurementId: "G-67R96J7EHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth();
const firestore= getFirestore(app);


// Function to store user data in Firestore
const storeUserData = (userId, userData) => {
  const userRef = doc(firestore, 'users', userId);
  return setDoc(userRef, userData);
};

// Function to retrieve user data from Firestore
const getUserData = async (userId) => {
  const userRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, get the user ID
    const userId = user.uid;
    
    // Example data to store for the user
    const userData = {
      name: user.displayName,
      email: user.email,
      // Add more data as needed
    };

    // Store user data in Firestore
    await storeUserData(userId, userData);
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});

export { app,auth, firestore, storeUserData, getUserData };