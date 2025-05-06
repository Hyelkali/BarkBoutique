"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin (has entered correct password)
  const checkAdminStatus = () => {
    const adminStatus = localStorage.getItem("barkboutique_admin")
    setIsAdmin(adminStatus === "true")
  }

  // Set admin status
  const setAdminStatus = (status) => {
    if (status) {
      localStorage.setItem("barkboutique_admin", "true")
    } else {
      localStorage.removeItem("barkboutique_admin")
    }
    setIsAdmin(status)
  }

  // Admin login with password
  const adminLogin = (password) => {
    if (password === "D0gs123") {
      setAdminStatus(true)
      return true
    }
    return false
  }

  // Admin logout
  const adminLogout = () => {
    setAdminStatus(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
      checkAdminStatus()
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
    isAdmin,
    adminLogin,
    adminLogout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
