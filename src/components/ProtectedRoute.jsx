"use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth()

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
