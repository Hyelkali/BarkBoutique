"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useOrders } from "../components/OrderContext"
import { useTheme } from "../components/ThemeContext"
import { useToast } from "../components/ToastContext"
import { Button } from "../components/ui/button"
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle, Clock, MapPin, Calendar, CreditCard } from "lucide-react"

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOrder } = useOrders()
  const { isDark } = useTheme()
  const toast = useToast()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("items")

  useEffect(() => {
    // Get order data
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const orderData = await getOrder(id)

        if (orderData) {
          setOrder(orderData)
        } else {
          toast.error("Order not found or you don't have permission to view it")
        }
      } catch (error) {
        console.error("Error fetching order:", error)
        toast.error("Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id, getOrder, toast])

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className="mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
        </div>
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
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => navigate("/orders")}>
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Button>

      <div className={`${isDark ? "bg-dark-800" : "bg-white"} rounded-lg shadow-lg p-6 mb-8`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Order {order.id}</h1>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(order.status)}
            <span
              className={`px-3 py-1 rounded-full ${
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
        </div>

        {/* Order Tracking */}
        {order.tracking && (
          <div className={`${isDark ? "bg-dark-700" : "bg-gray-50"} p-4 rounded-lg mb-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold">Tracking Information</h2>
                {order.tracking.number && (
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {order.tracking.carrier}: <span className="font-mono">{order.tracking.number}</span>
                  </p>
                )}
              </div>
              {order.tracking.estimatedDelivery && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Estimated Delivery: {new Date(order.tracking.estimatedDelivery).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Tracking Timeline */}
            {order.tracking.updates && order.tracking.updates.length > 0 && (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                <div className="space-y-4">
                  {order.tracking.updates.map((update, index) => (
                    <div key={index} className="flex gap-4 relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                          index === 0 ? "bg-primary-500 text-white" : isDark ? "bg-dark-600" : "bg-gray-200"
                        }`}
                      >
                        {index === 0 ? (
                          order.status === "delivered" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Truck className="w-4 h-4" />
                          )
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{update.status}</p>
                        <div className="flex flex-wrap gap-x-4 text-sm">
                          <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {new Date(update.date).toLocaleString()}
                          </span>
                          {update.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {update.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex space-x-8">
            <button
              className={`pb-2 ${
                activeTab === "items"
                  ? "border-b-2 border-primary-500 font-medium"
                  : isDark
                    ? "text-gray-400"
                    : "text-gray-500"
              }`}
              onClick={() => setActiveTab("items")}
            >
              Items
            </button>
            <button
              className={`pb-2 ${
                activeTab === "shipping"
                  ? "border-b-2 border-primary-500 font-medium"
                  : isDark
                    ? "text-gray-400"
                    : "text-gray-500"
              }`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping
            </button>
            <button
              className={`pb-2 ${
                activeTab === "payment"
                  ? "border-b-2 border-primary-500 font-medium"
                  : isDark
                    ? "text-gray-400"
                    : "text-gray-500"
              }`}
              onClick={() => setActiveTab("payment")}
            >
              Payment
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "items" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className={`flex gap-4 p-4 rounded-lg ${isDark ? "bg-dark-700" : "bg-gray-50"}`}>
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.selectedSize && (
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Shipping</span>
                <span>${order.shipping_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-dark-600">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className={`p-4 rounded-lg ${isDark ? "bg-dark-700" : "bg-gray-50"}`}>
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {order.shipping.firstName} {order.shipping.lastName}
                  </p>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>{order.shipping.email}</p>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>{order.shipping.address}</p>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                  </p>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>{order.shipping.country}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className={`p-4 rounded-lg ${isDark ? "bg-dark-700" : "bg-gray-50"}`}>
              <div className="flex items-start gap-2">
                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {order.payment.method === "credit_card"
                      ? "Credit Card"
                      : order.payment.method === "paypal"
                        ? "PayPal"
                        : order.payment.method}
                  </p>
                  {order.payment.method === "credit_card" && order.payment.last4 && (
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>•••• •••• •••• {order.payment.last4}</p>
                  )}
                  {order.payment.method === "paypal" && order.payment.email && (
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>{order.payment.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline">Need Help?</Button>
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Cancel Order
          </Button>
        )}
      </div>
    </motion.div>
  )
}
