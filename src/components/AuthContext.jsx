"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  auth,
  signInWithGoogle as firebaseSignInWithGoogle,
  loginWithEmailAndPassword as firebaseLoginWithEmailAndPassword,
  registerWithEmailAndPassword as firebaseRegisterWithEmailAndPassword,
  logOut as firebaseLogOut,
  updateProfile as firebaseUpdateProfile,
} from "../lib/firebase"

const AuthContext = createContext()

// Admin email constant
const ADMIN_EMAIL = "hyelnamuninathan@gmail.com"

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)

      // Check if user is admin
      if (user && (user.email === ADMIN_EMAIL || user.email === "admin@barkboutique.com")) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Sign in with Google
  const signInWithGoogle = async () => {
    setError(null)
    try {
      const result = await firebaseSignInWithGoogle()

      // Check if the Google sign-in email is admin
      if (result.user && result.user.email === ADMIN_EMAIL) {
        setIsAdmin(true)
      }

      return result
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Sign in with email and password
  const login = async (email, password) => {
    setError(null)
    try {
      const result = await firebaseLoginWithEmailAndPassword(email, password)

      // Check if the email is admin
      if (email === ADMIN_EMAIL) {
        setIsAdmin(true)
      }

      return result
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Register with email and password
  const register = async (name, email, password) => {
    setError(null)
    try {
      const result = await firebaseRegisterWithEmailAndPassword(name, email, password)

      // Check if the registered email is admin
      if (email === ADMIN_EMAIL) {
        setIsAdmin(true)
      }

      return result
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Sign out
  const signOut = async () => {
    setError(null)
    try {
      await firebaseLogOut()
      if (isAdmin) {
        adminLogout()
      }
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Update user profile
  const updateUserProfile = async (profileData) => {
    setError(null)
    try {
      if (!currentUser) throw new Error("No user is signed in")

      await firebaseUpdateProfile(currentUser, profileData)

      // Force refresh the user object
      setCurrentUser({ ...currentUser, ...profileData })

      return true
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Admin login
  const adminLogin = (password) => {
    if (password === "admin123" || currentUser?.email === ADMIN_EMAIL) {
      // This should be a secure mechanism in production
      setIsAdmin(true)
      return true
    }
    return false
  }

  // Admin logout
  const adminLogout = () => {
    setIsAdmin(false)
  }

  const value = {
    currentUser,
    loading,
    error,
    isAdmin,
    signInWithGoogle,
    login,
    register,
    signOut,
    updateUserProfile,
    adminLogin,
    adminLogout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
