"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthContext"

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    // Show loading spinner while auth state is being determined
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    )
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // If admin route but user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
