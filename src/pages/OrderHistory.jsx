"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useOrders } from "../components/OrderContext"
import { useTheme } from "../components/ThemeContext"
import { Button } from "../components/ui/button"
import { Package, Truck, CheckCircle, AlertCircle, Clock, Search, ChevronRight } from "lucide-react"

export default function OrderHistory() {
  const { orders, loading } = useOrders()
  const { isDark } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [displayedOrders, setDisplayedOrders] = useState([])

  useEffect(() => {
    // Filter orders based on search and status
    const filtered = orders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "" || order.status === filterStatus
      return matchesSearch && matchesStatus
    })

    setDisplayedOrders(filtered)
  }, [orders, searchTerm, filterStatus])

  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">Loading your orders...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <div className={`${isDark ? "bg-dark-800" : "bg-white"} rounded-lg shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDark ? "bg-dark-700 border-dark-600 text-white" : "bg-gray-100 border-gray-200 text-gray-900"
              } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              isDark ? "bg-dark-700 border-dark-600 text-white" : "bg-gray-100 border-gray-200 text-gray-900"
            } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {displayedOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
              {orders.length === 0 ? "You haven't placed any orders yet." : "No orders match your search criteria."}
            </p>
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedOrders.map((order) => (
              <Link
                to={`/order/${order.id}`}
                key={order.id}
                className={`block ${isDark ? "bg-dark-700 hover:bg-dark-600" : "bg-gray-50 hover:bg-gray-100"} rounded-lg p-4 transition-colors`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{order.id}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : order.status === "shipped"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mt-1`}>
                      Placed on {formatDate(order.createdAt?.toDate() || new Date())}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="w-12 h-12 rounded-md overflow-hidden bg-gray-200">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div
                        className={`w-12 h-12 rounded-md flex items-center justify-center ${isDark ? "bg-dark-600" : "bg-gray-200"}`}
                      >
                        <span className="text-xs">+{order.items.length - 3}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
