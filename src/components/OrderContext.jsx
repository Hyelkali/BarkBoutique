"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from "../services/orderService"
import { useToast } from "./ToastContext"

const OrderContext = createContext()

export function useOrders() {
  return useContext(OrderContext)
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser, isAdmin } = useAuth()
  const toast = useToast()

  // Load user orders when user changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        setOrders([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        let fetchedOrders

        if (isAdmin) {
          fetchedOrders = await getAllOrders()
        } else {
          fetchedOrders = await getUserOrders(currentUser.uid)
        }

        setOrders(fetchedOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast.error("Failed to load orders. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentUser, isAdmin, toast])

  // Create a new order
  const addOrder = async (orderData) => {
    try {
      if (!currentUser) {
        throw new Error("You must be logged in to place an order")
      }

      const userId = currentUser.uid
      const newOrder = await createOrder({
        ...orderData,
        userId,
      })

      // Update local state
      setOrders((prevOrders) => [newOrder, ...prevOrders])
      toast.success("Order placed successfully!")

      return newOrder
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Failed to place order. Please try again.")
      throw error
    }
  }

  // Get a specific order
  const getOrder = async (orderId) => {
    try {
      const order = await getOrderById(orderId)

      // Check if the user has permission to view this order
      if (!isAdmin && order && order.userId !== currentUser?.uid) {
        toast.error("You don't have permission to view this order")
        return null
      }

      return order
    } catch (error) {
      console.error("Error getting order:", error)
      toast.error("Failed to load order details")
      return null
    }
  }

  // Update order status (admin only)
  const updateOrder = async (orderId, status, location) => {
    try {
      if (!isAdmin) {
        throw new Error("Only admins can update order status")
      }

      const updatedOrder = await updateOrderStatus(orderId, status, location)

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status, tracking: updatedOrder.tracking } : order,
        ),
      )

      toast.success(`Order status updated to ${status}`)
      return updatedOrder
    } catch (error) {
      console.error("Error updating order:", error)
      toast.error("Failed to update order status")
      throw error
    }
  }

  const value = {
    orders,
    loading,
    addOrder,
    getOrder,
    updateOrder,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
