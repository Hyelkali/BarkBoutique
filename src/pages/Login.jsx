"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
  signInWithGoogle,
  loginWithEmailAndPassword as firebaseSignIn,
  resetPassword,
  setPersistence,
  auth, // Import auth
} from "../lib/firebase"
import { useAuth } from "../components/AuthContext"
import { useToast } from "../components/ToastContext"
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn, ArrowLeft, Key } from "lucide-react"
import { Button } from "../components/ui/button"

// Admin email constant
const ADMIN_EMAIL = "hyelnamuninathan@gmail.com"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [loginAttempts, setLoginAttempts] = useState(0)

  const { currentUser, adminLogin, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/"

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.email === ADMIN_EMAIL || isAdmin) {
        navigate("/admin")
      } else if (!isAdminMode) {
        navigate(from, { replace: true })
      }
    }
  }, [currentUser, isAdminMode, navigate, from, isAdmin])

  // Load login attempts from localStorage
  useEffect(() => {
    const storedAttempts = localStorage.getItem(`loginAttempts_${email}`)
    if (storedAttempts) {
      setLoginAttempts(Number.parseInt(storedAttempts, 10))
    }
  }, [email])

  const validateForm = () => {
    const errors = {}

    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
    }

    if (!password) {
      errors.password = "Password is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      await signInWithGoogle()
      toast.success("Successfully signed in with Google!")

      // Check if the user is admin and redirect accordingly
      if (auth.currentUser?.email === ADMIN_EMAIL) {
        adminLogin("admin123") // Auto login as admin
        navigate("/admin")
      } else {
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      setError(error.message || "Failed to sign in with Google")
      toast.error(error.message || "Failed to sign in with Google")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailSignIn = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      // Check if too many failed attempts
      if (loginAttempts >= 5) {
        setShowForgotPassword(true)
        setResetEmail(email)
        setError("Too many failed login attempts. Please reset your password.")
        return
      }

      // Check if this is the admin email
      if (email === ADMIN_EMAIL) {
        // Set admin mode
        await firebaseSignIn(email, password)
        adminLogin("admin123") // Auto login as admin
        toast.success("Admin login successful!")
        navigate("/admin")
        return
      }

      // Set persistence based on remember me
      await setPersistence(rememberMe)

      // Attempt login
      await firebaseSignIn(email, password)

      // Reset login attempts on success
      localStorage.removeItem(`loginAttempts_${email}`)
      setLoginAttempts(0)

      toast.success("Successfully signed in!")
      navigate(from, { replace: true })
    } catch (error) {
      console.error("Error signing in:", error)

      // Increment login attempts
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)
      localStorage.setItem(`loginAttempts_${email}`, newAttempts.toString())

      // Show appropriate error message
      if (newAttempts >= 5) {
        setError("Too many failed login attempts. Please reset your password.")
        setShowForgotPassword(true)
        setResetEmail(email)
      } else {
        setError(error.message || "Invalid email or password")
        toast.error(error.message || "Invalid email or password")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAdminLogin = async (e) => {
    e.preventDefault()

    if (!adminPassword) {
      setFormErrors({ adminPassword: "Admin password is required" })
      return
    }

    try {
      setIsSubmitting(true)
      setError("")
      const success = adminLogin(adminPassword)

      if (success) {
        toast.success("Admin login successful!")
        navigate("/admin")
      } else {
        setError("Invalid admin password")
        toast.error("Invalid admin password")
      }
    } catch (error) {
      console.error("Error logging in as admin:", error)
      setError(error.message || "Failed to login as admin")
      toast.error(error.message || "Failed to login as admin")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()

    if (!resetEmail) {
      setFormErrors({ resetEmail: "Email is required" })
      return
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setFormErrors({ resetEmail: "Email is invalid" })
      return
    }

    try {
      setIsSubmitting(true)
      setError("")
      await resetPassword(resetEmail)

      // Reset login attempts after password reset
      localStorage.removeItem(`loginAttempts_${resetEmail}`)
      setLoginAttempts(0)

      setSuccess("Password reset email sent! Check your inbox.")
      toast.success("Password reset email sent! Check your inbox.")
    } catch (error) {
      console.error("Error resetting password:", error)
      setError(error.message || "Failed to send password reset email")
      toast.error(error.message || "Failed to send password reset email")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-dark-900 dark:to-indigo-950"
    >
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg shadow-xl bg-white/80 backdrop-blur-sm dark:bg-dark-800/90">
          <div className="px-6 py-8 sm:px-10">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {showForgotPassword ? "Reset Password" : isAdminMode ? "Admin Login" : "Welcome Back"}
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {showForgotPassword
                  ? "Enter your email to receive a password reset link"
                  : isAdminMode
                    ? "Enter the admin password to continue"
                    : "Sign in to your account to continue"}
              </p>
            </div>

            {error && (
              <div className="flex items-start p-4 mb-6 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/30 dark:border-red-800">
                <AlertCircle className="flex-shrink-0 mt-0.5 text-red-500 mr-3" size={18} />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-start p-4 mb-6 border border-green-200 rounded-md bg-green-50 dark:bg-green-900/30 dark:border-green-800">
                <div className="flex-shrink-0 mt-0.5 text-green-500 mr-3">✓</div>
                <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
              </div>
            )}

            {showForgotPassword ? (
              <form onSubmit={handlePasswordReset} className="space-y-5">
                <div>
                  <label
                    htmlFor="resetEmail"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                    <input
                      type="email"
                      id="resetEmail"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value)
                        setFormErrors({ ...formErrors, resetEmail: null })
                      }}
                      className={`w-full px-4 py-3 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white ${
                        formErrors.resetEmail
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-dark-600"
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  {formErrors.resetEmail && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.resetEmail}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setSuccess("")
                      setFormErrors({})
                    }}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            ) : isAdminMode ? (
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="adminPassword"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Admin Password
                  </label>
                  <div className="relative">
                    <Key className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="adminPassword"
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value)
                        setFormErrors({ ...formErrors, adminPassword: null })
                      }}
                      className={`w-full px-4 py-3 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white ${
                        formErrors.adminPassword
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-dark-600"
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formErrors.adminPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.adminPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login as Admin"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(false)
                      setError("")
                      setFormErrors({})
                    }}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                  >
                    <ArrowLeft className="inline w-4 h-4 mr-1" />
                    Back to regular login
                  </button>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={handleEmailSignIn} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setFormErrors({ ...formErrors, email: null })
                        }}
                        className={`w-full px-4 py-3 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white ${
                          formErrors.email
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-300 dark:border-dark-600"
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                        onClick={() => {
                          setShowForgotPassword(true)
                          setResetEmail(email)
                          setError("")
                          setFormErrors({})
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setFormErrors({ ...formErrors, password: null })
                        }}
                        className={`w-full px-4 py-3 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white ${
                          formErrors.password
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-300 dark:border-dark-600"
                        }`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 dark:hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Signing in..."
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-dark-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-gray-500 bg-white dark:bg-dark-800 dark:text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white dark:hover:bg-dark-600"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"
                          fill="#4285F4"
                        />
                      </svg>
                      Sign in with Google
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            )}

            {!showForgotPassword && !isAdminMode && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsAdminMode(true)
                    setError("")
                    setFormErrors({})
                  }}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  Login as Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Login
