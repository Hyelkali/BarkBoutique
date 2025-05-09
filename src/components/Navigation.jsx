"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Logo } from "./Logo"
import { CartIcon } from "./CartIcon"
import { CartSidebar } from "./CartSidebar"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "./AuthContext"
import { logOut } from "../lib/firebase"
import { Package, Menu, X, User, LogOut, LogIn, UserPlus } from "lucide-react"

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const { currentUser, isAdmin, adminLogout } = useAuth()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  useEffect(() => {
    setIsOpen(false)
    setUserMenuOpen(false)
  }, [location])

  useEffect(() => {
    // Close user menu when clicking outside
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logOut()
      if (isAdmin) {
        adminLogout()
      }
      navigate("/")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-white shadow-sm dark:bg-dark-900">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            {/* Left section: Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 mr-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 md:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link to="/" className="flex items-center overflow-visible">
                <Logo />
              </Link>
            </div>

            {/* Center section: Desktop navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-6">
                <li>
                  <Link
                    to="/"
                    className="px-2 py-1 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="px-2 py-1 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/breeds"
                    className="px-2 py-1 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Breeds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="px-2 py-1 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Blog
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="px-2 py-1 transition-colors text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* Right section: User actions */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              {/* Only show ThemeToggle on desktop */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    className="flex items-center space-x-2 focus:outline-none"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        src={
                          currentUser.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || currentUser.email)}&background=random`
                        }
                        alt={currentUser.displayName || "User"}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="hidden text-sm font-medium text-gray-700 md:inline dark:text-gray-200">
                      {currentUser.displayName?.split(" ")[0] || currentUser.email?.split("@")[0]}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 z-10 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-dark-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b dark:text-gray-400 dark:border-dark-600">
                        Signed in as <span className="font-medium">{currentUser.email}</span>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-600"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Your Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-600"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Your Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-600"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          handleLogout()
                          setUserMenuOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 transition-colors rounded-md hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-800"
                  >
                    <LogIn className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 text-sm text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                  >
                    <UserPlus className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Register</span>
                  </Link>
                </div>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                aria-label="Cart"
              >
                <CartIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-40 w-full transition-colors duration-300 bg-white shadow-md md:hidden dark:bg-dark-800"
          >
            <nav className="container px-4 py-4 mx-auto">
              {/* Add ThemeToggle at the top of mobile menu */}
              <div className="flex items-center justify-between pb-2 mb-4 border-b dark:border-dark-600">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <ThemeToggle />
              </div>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="block px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/breeds"
                    className="block px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Breeds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="block px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>
                </li>

                {currentUser ? (
                  <>
                    <li className="pt-2 mt-2 border-t dark:border-dark-600">
                      <Link
                        to="/profile"
                        className="flex items-center px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Your Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="flex items-center px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                        onClick={() => setIsOpen(false)}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Your Orders
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link
                          to="/admin"
                          className="flex items-center px-2 py-2 transition-colors text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="flex items-center w-full px-2 py-2 text-left text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-2 mt-2 border-t dark:border-dark-600">
                      <Link
                        to="/login"
                        className="flex items-center px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="flex items-center px-2 py-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
