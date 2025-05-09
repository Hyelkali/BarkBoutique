
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  setPersistence as firebaseSetPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBvUbXZdJ7aQd7UbdPfGjytnxV41Qa9U4",
  authDomain: "pallet-bodega-shop.firebaseapp.com",
  projectId: "pallet-bodega-shop",
  storageBucket: "pallet-bodega-shop.firebasestorage.app",
  messagingSenderId: "799472142873",
  appId: "1:799472142873:web:1f0a93cd59ac139e4af888",
  measurementId: "G-51546KS2N4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider()

// Set persistence based on remember me option
export const setPersistence = async (rememberMe = false) => {
  const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence
  try {
    await firebaseSetPersistence(auth, persistenceType)
    return true
  } catch (error) {
    console.error("Error setting persistence", error)
    throw error
  }
}

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

// Email/Password Sign Up
export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await firebaseUpdateProfile(result.user, { displayName: name })
    return result.user
  } catch (error) {
    console.error("Error registering with email and password", error)
    throw error
  }
}

// Email/Password Sign In
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    console.error("Error signing in with email and password", error)
    throw error
  }
}

// Password Reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    console.error("Error resetting password", error)
    throw error
  }
}

// Update user profile
export const updateProfile = async (user, profileData) => {
  try {
    await firebaseUpdateProfile(user, profileData)
    return true
  } catch (error) {
    console.error("Error updating profile", error)
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

export { auth, db, storage }
