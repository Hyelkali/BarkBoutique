import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../lib/firebase"

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: orderData.status || "pending",
      tracking: orderData.tracking || {
        updates: [
          {
            status: "order_placed",
            timestamp: new Date().toISOString(),
            message: "Order has been placed",
          },
        ],
      },
    })

    // Get the newly created order
    const orderSnapshot = await getDoc(orderRef)
    return {
      id: orderSnapshot.id,
      ...orderSnapshot.data(),
    }
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Get all orders for a specific user
export const getUserOrders = async (userId) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting user orders:", error)
    throw error
  }
}

// Get a specific order by ID
export const getOrderById = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId))

    if (!orderDoc.exists()) {
      throw new Error("Order not found")
    }

    return {
      id: orderDoc.id,
      ...orderDoc.data(),
    }
  } catch (error) {
    console.error("Error getting order:", error)
    throw error
  }
}

// Get all orders (admin only)
export const getAllOrders = async () => {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting all orders:", error)
    throw error
  }
}

// Update order status
export const updateOrderStatus = async (orderId, status, location) => {
  try {
    const orderRef = doc(db, "orders", orderId)
    const orderDoc = await getDoc(orderRef)

    if (!orderDoc.exists()) {
      throw new Error("Order not found")
    }

    const orderData = orderDoc.data()
    const tracking = orderData.tracking || { updates: [] }

    // Add new status update
    tracking.updates.push({
      status,
      timestamp: new Date().toISOString(),
      message: getStatusMessage(status),
      location,
    })

    // Update the order
    await updateDoc(orderRef, {
      status,
      tracking,
      updatedAt: serverTimestamp(),
    })

    return {
      id: orderId,
      ...orderData,
      status,
      tracking,
    }
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

// Helper function to get status message
const getStatusMessage = (status) => {
  switch (status) {
    case "pending":
      return "Order has been placed"
    case "processing":
      return "Order is being processed"
    case "shipped":
      return "Order has been shipped"
    case "delivered":
      return "Order has been delivered"
    case "cancelled":
      return "Order has been cancelled"
    default:
      return `Order status updated to ${status}`
  }
}
