"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Logo } from "./Logo"
import { CartIcon } from "./CartIcon"
import { CartSidebar } from "./CartSidebar"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "./AuthContext"
import { logOut } from "../lib/firebase"

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const { currentUser, isAdmin, adminLogout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

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
      <header className="sticky top-0 z-50 transition-colors duration-300 bg-white shadow-sm dark:bg-dark-900">
        <div className="container py-2 mx-auto">
          <div className="flex items-center px-2 justify-evenly">
            <div className="flex items-center">
              <Link to="/" className="mr-12">
                <Logo />
              </Link>
              <nav className="hidden ml-12 mr-6 md:block">
                <ul className="flex space-x-8">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className="text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/breeds"
                      className="text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    >
                      Breeds
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    >
                      Blog
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        to="/admin"
                        className="transition-colors text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Admin
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <img
                      src={currentUser.photoURL || "https://ui-avatars.com/api/?name=" + currentUser.displayName}
                      alt={currentUser.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden text-sm text-gray-700 md:inline dark:text-gray-200">
                      {currentUser.displayName}
                    </span>
                  </button>
                  <div className="absolute right-0 invisible w-48 py-1 mt-2 transition-all duration-200 bg-white rounded-md shadow-lg opacity-0 dark:bg-dark-700 group-hover:opacity-100 group-hover:visible">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                aria-label="Cart"
              >
                <CartIcon />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 md:hidden"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="transition-colors duration-300 bg-white shadow-md md:hidden dark:bg-dark-800"
          >
            <nav className="container px-4 py-4 mx-auto">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="block text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/breeds"
                    className="block text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Breeds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="block text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    Blog
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="block transition-colors text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Admin
                    </Link>
                  </li>
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
