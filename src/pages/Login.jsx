"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "../lib/firebase"
import { useAuth } from "../components/AuthContext"
import { motion } from "framer-motion"

const Login = () => {
  const [adminPassword, setAdminPassword] = useState("")
  const [error, setError] = useState("")
  const [isAdminMode, setIsAdminMode] = useState(false)
  const { currentUser, adminLogin } = useAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate("/")
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.")
    }
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    const success = adminLogin(adminPassword)
    if (success) {
      navigate("/admin")
    } else {
      setError("Invalid admin password")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16 max-w-md"
    >
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          {isAdminMode ? "Admin Login" : "Sign In"}
        </h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {isAdminMode ? (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Login as Admin
            </button>
          </form>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white dark:hover:bg-dark-600"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"
                fill="#4285F4"
              />
            </svg>
            Sign in with Google
          </button>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            {isAdminMode ? "Back to regular login" : "Login as Admin"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Login
