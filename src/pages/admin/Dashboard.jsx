"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"
import { motion } from "framer-motion"

const AdminDashboard = () => {
  const { currentUser } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>
        <div className="flex items-center mb-8">
          <img
            src={currentUser?.photoURL || "https://ui-avatars.com/api/?name=Admin"}
            alt="Admin"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Welcome, {currentUser?.displayName || "Admin"}</h2>
            <p className="text-gray-600 dark:text-gray-400">{currentUser?.email || "admin@barkboutique.com"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-gray-100 dark:bg-dark-700 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold dark:text-white">Products</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your product inventory</p>
          </Link>

          <div className="bg-gray-100 dark:bg-dark-700 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold dark:text-white">Orders</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">View and manage customer orders</p>
          </div>

          <div className="bg-gray-100 dark:bg-dark-700 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold dark:text-white">Customers</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage customer accounts and data</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Products</p>
            <p className="text-2xl font-bold dark:text-white">8</p>
          </div>
          <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold dark:text-white">24</p>
          </div>
          <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
            <p className="text-2xl font-bold dark:text-white">12</p>
          </div>
          <div className="bg-gray-100 dark:bg-dark-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Revenue</p>
            <p className="text-2xl font-bold dark:text-white">$1,245</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
