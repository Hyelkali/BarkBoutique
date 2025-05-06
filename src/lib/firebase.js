// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCBvUbXZdJ7aQd7UbdPfGjytnxV41Qa9U4",
  authDomain: "pallet-bodega-shop.firebaseapp.com",
  projectId: "pallet-bodega-shop",
  storageBucket: "pallet-bodega-shop.firebasestorage.app",
  messagingSenderId: "799472142873",
  appId: "1:799472142873:web:1f0a93cd59ac139e4af888",
  measurementId: "G-51546KS2N4"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    console.error("Error signing in with Google", error)
    throw error
  }
}

// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error signing out", error)
    throw error
  }
}

export { auth }
