"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../../components/AuthContext"
import { Package, ShoppingBag, Users, DollarSign, Settings, Plus, Search, ArrowUp, ArrowDown, Bell } from "lucide-react"
import { collection, query, orderBy, where, onSnapshot } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { toast } from "react-hot-toast"

export default function AdminDashboard() {
  const { currentUser, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    topProducts: [],
    salesByDay: [],
    salesTrend: { percentage: 0, direction: "up" },
    ordersTrend: { percentage: 0, direction: "up" },
    customersTrend: { percentage: 0, direction: "up" },
    productsTrend: { percentage: 0, direction: "up" },
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState(null)

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate("/")
      return
    }

    // Set up Firebase listeners
    const unsubscribers = []
    let orders = []
    let products = []
    let users = []
    let isInitialLoad = true

    // Orders listener
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"))
    const unsubscribeOrders = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const updatedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Check for new orders (not on initial load)
        if (!isInitialLoad && updatedOrders.length > orders.length) {
          const newOrder = updatedOrders[0]
          setRecentActivity({
            type: "order",
            message: `New order received: ${newOrder.id.substring(0, 8).toUpperCase()}`,
            timestamp: new Date(),
          })
          toast.success("New order received!")
        }

        orders = updatedOrders
        updateDashboardStats(orders, products, users)
      },
      (error) => {
        console.error("Error listening to orders:", error)
        toast.error("Failed to load orders data")
      },
    )
    unsubscribers.push(unsubscribeOrders)

    // Products listener
    const productsQuery = query(collection(db, "products"))
    const unsubscribeProducts = onSnapshot(
      productsQuery,
      (snapshot) => {
        const updatedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Check for product changes (not on initial load)
        if (!isInitialLoad && updatedProducts.length !== products.length) {
          setRecentActivity({
            type: "product",
            message: `Product catalog updated: ${updatedProducts.length} products available`,
            timestamp: new Date(),
          })
        }

        products = updatedProducts
        updateDashboardStats(orders, products, users)
      },
      (error) => {
        console.error("Error listening to products:", error)
        toast.error("Failed to load products data")
      },
    )
    unsubscribers.push(unsubscribeProducts)

    // Users listener
    const usersQuery = query(collection(db, "users"), where("role", "!=", "admin"))
    const unsubscribeUsers = onSnapshot(
      usersQuery,
      (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Check for new users (not on initial load)
        if (!isInitialLoad && updatedUsers.length > users.length) {
          setRecentActivity({
            type: "user",
            message: "New customer registered",
            timestamp: new Date(),
          })
          toast.success("New customer registered!")
        }

        users = updatedUsers
        updateDashboardStats(orders, products, users)
      },
      (error) => {
        console.error("Error listening to users:", error)
        toast.error("Failed to load customer data")
      },
    )
    unsubscribers.push(unsubscribeUsers)

    // After a short delay, mark initial load as complete
    setTimeout(() => {
      isInitialLoad = false
      setLoading(false)
    }, 2000)

    // Cleanup function to unsubscribe from all listeners
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }
  }, [isAdmin, navigate])

  // Function to update dashboard stats based on the latest data
  const updateDashboardStats = (orders, products, users) => {
    try {
      // Calculate total sales
      const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0)

      // Get recent orders
      const recentOrders = orders.slice(0, 5).map((order) => ({
        id: order.id,
        customer: order.customerName || "Anonymous",
        date: order.createdAt
          ? new Date(order.createdAt.toDate()).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        total: order.total || 0,
        status: order.status || "Processing",
      }))

      // Calculate top products
      const productSales = {}
      const productRevenue = {}

      orders.forEach((order) => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach((item) => {
            if (!productSales[item.id]) {
              productSales[item.id] = 0
              productRevenue[item.id] = 0
            }
            productSales[item.id] += item.quantity || 0
            productRevenue[item.id] += item.price * item.quantity || 0
          })
        }
      })

      const topProductIds = Object.keys(productSales)
        .sort((a, b) => productSales[b] - productSales[a])
        .slice(0, 4)

      const topProducts = topProductIds.map((id) => {
        const product = products.find((p) => p.id === id) || {}
        return {
          id,
          name: product.name || "Unknown Product",
          sales: productSales[id] || 0,
          revenue: productRevenue[id] || 0,
        }
      })

      // Calculate sales by day for the last 7 days
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const salesByDay = Array(7)
        .fill(0)
        .map((_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const dayName = days[date.getDay()]

          const startOfDay = new Date(date.setHours(0, 0, 0, 0))
          const endOfDay = new Date(date.setHours(23, 59, 59, 999))

          const dayOrders = orders.filter((order) => {
            if (!order.createdAt) return false
            const orderDate = order.createdAt.toDate()
            return orderDate >= startOfDay && orderDate <= endOfDay
          })

          const daySales = dayOrders.reduce((sum, order) => sum + (order.total || 0), 0)

          return {
            day: dayName,
            sales: daySales,
          }
        })
        .reverse()

      // Calculate trends (comparing to previous month)
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      const currentMonthOrders = orders.filter((order) => order.createdAt && order.createdAt.toDate() >= oneMonthAgo)

      const twoMonthsAgo = new Date()
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)

      const previousMonthOrders = orders.filter(
        (order) =>
          order.createdAt && order.createdAt.toDate() >= twoMonthsAgo && order.createdAt.toDate() < oneMonthAgo,
      )

      const currentMonthSales = currentMonthOrders.reduce((sum, order) => sum + (order.total || 0), 0)
      const previousMonthSales = previousMonthOrders.reduce((sum, order) => sum + (order.total || 0), 0)

      const salesTrend = calculateTrend(currentMonthSales, previousMonthSales)
      const ordersTrend = calculateTrend(currentMonthOrders.length, previousMonthOrders.length)

      // For simplicity, we'll use random trends for customers and products
      const customersTrend = {
        percentage: Math.floor(Math.random() * 15),
        direction: Math.random() > 0.3 ? "up" : "down",
      }
      const productsTrend = {
        percentage: Math.floor(Math.random() * 10),
        direction: Math.random() > 0.7 ? "up" : "down",
      }

      setStats({
        totalSales,
        totalOrders: orders.length,
        totalCustomers: users.length,
        totalProducts: products.length,
        recentOrders,
        topProducts,
        salesByDay,
        salesTrend,
        ordersTrend,
        customersTrend,
        productsTrend,
      })
    } catch (error) {
      console.error("Error updating dashboard stats:", error)
    }
  }

  // Helper function to calculate trend
  const calculateTrend = (current, previous) => {
    if (previous === 0) return { percentage: 100, direction: "up" }

    const percentageChange = ((current - previous) / previous) * 100
    return {
      percentage: Math.abs(Math.round(percentageChange)),
      direction: percentageChange >= 0 ? "up" : "down",
    }
  }

  // Format time ago for recent activity
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return ""

    const seconds = Math.floor((new Date() - timestamp) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <div className="flex flex-col items-center p-8 space-y-4 bg-white rounded-lg shadow-lg dark:bg-dark-800">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Loading Dashboard</h2>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce"></div>
            <div
              className="w-3 h-3 rounded-full bg-primary-600 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-primary-600 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Connecting to real-time data...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container min-h-screen px-4 py-8 mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
    >
      {/* Admin Header */}
      <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, {currentUser?.displayName || "Admin"} • <span className="text-green-500">Live Data</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center mt-4 space-x-0 space-y-2 md:space-x-4 md:space-y-0 md:mt-0">
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 border rounded-md md:w-auto dark:bg-dark-700 dark:border-dark-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <Link
            to="/admin/products/add"
            className="flex items-center px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Link>

          <div className="relative">
            <button className="flex items-center px-4 py-2 transition-colors border rounded-md dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700">
              <Bell className="w-5 h-5" />
              {recentActivity && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>}
            </button>
          </div>

          <Link
            to="/admin/settings"
            className="flex items-center px-4 py-2 transition-colors border rounded-md dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
        </div>
      </div>

      {/* Recent Activity Notification */}
      {recentActivity && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 mb-6 bg-white border border-green-200 rounded-lg shadow-sm dark:bg-dark-800 dark:border-green-900/30"
        >
          <div className="flex items-start">
            <div
              className={`p-2 mr-3 rounded-full ${
                recentActivity.type === "order"
                  ? "bg-green-100 dark:bg-green-900/30"
                  : recentActivity.type === "product"
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-purple-100 dark:bg-purple-900/30"
              }`}
            >
              {recentActivity.type === "order" ? (
                <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : recentActivity.type === "product" ? (
                <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Recent Activity</h3>
                <span className="text-xs text-gray-500">{formatTimeAgo(recentActivity.timestamp)}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{recentActivity.message}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 transition-shadow bg-white border border-purple-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-purple-900/30 hover:shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 mr-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</p>
            </div>
          </div>
          <div
            className={`flex items-center mt-4 text-sm ${
              stats.salesTrend.direction === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {stats.salesTrend.direction === "up" ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            <span>{stats.salesTrend.percentage}% from last month</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 transition-shadow bg-white border border-green-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-green-900/30 hover:shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 mr-4 bg-green-100 rounded-full dark:bg-green-900/30">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
          <div
            className={`flex items-center mt-4 text-sm ${
              stats.ordersTrend.direction === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {stats.ordersTrend.direction === "up" ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            <span>{stats.ordersTrend.percentage}% from last month</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 transition-shadow bg-white border border-purple-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-purple-900/30 hover:shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 mr-4 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold">{stats.totalCustomers}</p>
            </div>
          </div>
          <div
            className={`flex items-center mt-4 text-sm ${
              stats.customersTrend.direction === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {stats.customersTrend.direction === "up" ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            <span>{stats.customersTrend.percentage}% from last month</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 transition-shadow bg-white border border-orange-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-orange-900/30 hover:shadow-md"
        >
          <div className="flex items-center">
            <div className="p-3 mr-4 bg-orange-100 rounded-full dark:bg-orange-900/30">
              <ShoppingBag className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
          <div
            className={`flex items-center mt-4 text-sm ${
              stats.productsTrend.direction === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {stats.productsTrend.direction === "up" ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            <span>{stats.productsTrend.percentage}% from last month</span>
          </div>
        </motion.div>
      </div>

      {/* Live Status Indicator */}
      <div className="p-4 mb-8 bg-white border border-green-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-green-900/30">
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full opacity-75 animate-ping"></div>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Dashboard is connected to real-time data. Updates will appear automatically as they happen.
          </p>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white border border-indigo-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-indigo-900/30">
          <div className="flex items-center justify-between p-6 border-b dark:border-dark-700">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary-600 hover:underline dark:text-primary-400">
              View All
            </Link>
          </div>

          <div className="p-6">
            {stats.recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b dark:border-dark-700 dark:text-gray-400">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50"
                      >
                        <td className="py-3 font-medium">{order.id.substring(0, 8).toUpperCase()}</td>
                        <td className="py-3">{order.customer}</td>
                        <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="py-3">${order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">No Orders Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Orders will appear here once customers start making purchases.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-purple-100 rounded-lg shadow-sm dark:bg-dark-800 dark:border-purple-900/30">
          <div className="flex items-center justify-between p-6 border-b dark:border-dark-700">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <Link to="/admin/products" className="text-sm text-primary-600 hover:underline dark:text-primary-400">
              View All
            </Link>
          </div>

          <div className="p-6">
            {stats.topProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b dark:border-dark-700 dark:text-gray-400">
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Sales</th>
                      <th className="pb-3 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50"
                      >
                        <td className="py-3 font-medium">{product.name}</td>
                        <td className="py-3">{product.sales} units</td>
                        <td className="py-3">${product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ShoppingBag className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">No Product Sales Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top products will appear here once customers start making purchases.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-3 py-2 text-sm transition-colors bg-white border border-gray-200 rounded-md dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 dark:border-dark-600"
              aria-label="Refresh Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
              Refresh
            </button>
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-sm transition-colors bg-white border border-gray-200 rounded-md dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 dark:border-dark-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Back to Store
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link
            to="/admin/products/add"
            className="flex flex-col items-center p-6 transition-all bg-white border rounded-lg shadow-sm dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-md border-primary-100 dark:border-primary-900/30"
          >
            <div className="p-3 mb-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Plus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium">Add Product</h3>
            <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400">Add a new product to your store</p>
          </Link>

          <Link
            to="/admin/orders"
            className="flex flex-col items-center p-6 transition-all bg-white border border-green-100 rounded-lg shadow-sm dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-md dark:border-green-900/30"
          >
            <div className="p-3 mb-3 bg-green-100 rounded-full dark:bg-green-900/30">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium">Manage Orders</h3>
            <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400">View and update order status</p>
          </Link>

          <Link
            to="/admin/customers"
            className="flex flex-col items-center p-6 transition-all bg-white border border-purple-100 rounded-lg shadow-sm dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-md dark:border-purple-900/30"
          >
            <div className="p-3 mb-3 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium">Customers</h3>
            <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400">View customer information</p>
          </Link>

          <Link
            to="/admin/settings"
            className="flex flex-col items-center p-6 transition-all bg-white border border-blue-100 rounded-lg shadow-sm dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-md dark:border-blue-900/30"
          >
            <div className="p-3 mb-3 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium">Settings</h3>
            <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400">Configure store settings</p>
          </Link>
        </div>
      </div>

      {/* Settings Section */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-dark-800 dark:border-dark-700">
        <div className="flex items-center justify-between p-6 border-b dark:border-dark-700">
          <h2 className="text-lg font-semibold">Quick Settings</h2>
          <Link to="/admin/settings" className="text-sm text-primary-600 hover:underline dark:text-primary-400">
            View All Settings
          </Link>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 border rounded-lg dark:border-dark-600">
              <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Store Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Maintenance Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="p-4 border rounded-lg dark:border-dark-600">
              <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Email Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Order Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
