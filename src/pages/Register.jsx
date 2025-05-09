"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { registerWithEmailAndPassword, signInWithGoogle } from "../lib/firebase"
import { useToast } from "../components/ToastContext"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, UserPlus, LogIn, Check, X } from "lucide-react"
import { Button } from "../components/ui/button"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState([])

  const navigate = useNavigate()
  const toast = useToast()

  // Calculate password strength whenever password changes
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      setPasswordFeedback([])
      return
    }

    const feedback = []
    let strength = 0

    // Length check
    if (password.length >= 8) {
      strength += 1
      feedback.push({ passed: true, message: "At least 8 characters" })
    } else {
      feedback.push({ passed: false, message: "At least 8 characters" })
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 1
      feedback.push({ passed: true, message: "Contains uppercase letter" })
    } else {
      feedback.push({ passed: false, message: "Contains uppercase letter" })
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 1
      feedback.push({ passed: true, message: "Contains lowercase letter" })
    } else {
      feedback.push({ passed: false, message: "Contains lowercase letter" })
    }

    // Number check
    if (/\d/.test(password)) {
      strength += 1
      feedback.push({ passed: true, message: "Contains number" })
    } else {
      feedback.push({ passed: false, message: "Contains number" })
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1
      feedback.push({ passed: true, message: "Contains special character" })
    } else {
      feedback.push({ passed: false, message: "Contains special character" })
    }

    setPasswordStrength(strength)
    setPasswordFeedback(feedback)
  }, [password])

  const validateForm = () => {
    const errors = {}

    if (!name.trim()) {
      errors.name = "Name is required"
    }

    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "Very Weak"
    if (passwordStrength === 1) return "Weak"
    if (passwordStrength === 2) return "Fair"
    if (passwordStrength === 3) return "Good"
    if (passwordStrength === 4) return "Strong"
    if (passwordStrength === 5) return "Very Strong"
    return ""
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-red-500"
    if (passwordStrength === 1) return "bg-red-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-yellow-500"
    if (passwordStrength === 4) return "bg-green-500"
    if (passwordStrength === 5) return "bg-green-500"
    return "bg-gray-200"
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Require at least a "Fair" password strength
    if (passwordStrength < 2) {
      setFormErrors({
        ...formErrors,
        password: "Please create a stronger password",
      })
      return
    }

    try {
      setIsSubmitting(true)
      setError("")
      await registerWithEmailAndPassword(name, email, password)
      toast.success("Account created successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error registering:", error)
      setError(error.message || "Failed to create account")
      toast.error(error.message || "Failed to create account")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true)
      setError("")
      await signInWithGoogle()
      toast.success("Successfully signed in with Google!")
      navigate("/")
    } catch (error) {
      console.error("Error signing in with Google:", error)
      setError(error.message || "Failed to sign in with Google")
      toast.error(error.message || "Failed to sign in with Google")
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
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-dark-900 dark:to-purple-950"
    >
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg shadow-xl bg-white/80 backdrop-blur-sm dark:bg-dark-800/90">
          <div className="px-6 py-8 sm:px-10">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join BarkBoutique to discover premium pet products
              </p>
            </div>

            {error && (
              <div className="flex items-start p-4 mb-6 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/30 dark:border-red-800">
                <AlertCircle className="flex-shrink-0 mt-0.5 text-red-500 mr-3" size={18} />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setFormErrors({ ...formErrors, name: null })
                    }}
                    className={`w-full px-4 py-3 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white ${
                      formErrors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-dark-600"
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                {formErrors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>}
              </div>

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
                      formErrors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-dark-600"
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {formErrors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
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
                    minLength={6}
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

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1 h-2 mr-2 bg-gray-200 rounded-full dark:bg-dark-600">
                        <div
                          className={`h-full rounded-full ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {getPasswordStrengthLabel()}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1">
                      {passwordFeedback.map((item, index) => (
                        <div key={index} className="flex items-center text-xs">
                          {item.passed ? (
                            <Check className="w-3 h-3 mr-1 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 mr-1 text-red-500" />
                          )}
                          <span
                            className={
                              item.passed ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                            }
                          >
                            {item.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setFormErrors({ ...formErrors, confirmPassword: null })
                    }}
                    className={`w-full px-4 py-3 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white ${
                      formErrors.confirmPassword
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-dark-600"
                    }`}
                    placeholder="••••••••"
                    required
                  />
                </div>
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating Account..."
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
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
                  <span className="px-2 text-gray-500 bg-white/80 dark:bg-dark-800/90 dark:text-gray-400">
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
                  Sign up with Google
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  <LogIn className="inline w-4 h-4 mr-1" />
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Register
