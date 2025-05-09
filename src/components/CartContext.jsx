"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "../components/ui/toast-notification"

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart)
        } else {
          console.error("Invalid cart format in localStorage")
          localStorage.removeItem("cart")
        }
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error)
      localStorage.removeItem("cart")
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Update localStorage and totals whenever cart changes
  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem("cart", JSON.stringify(cart))

      // Calculate totals
      const items = cart.reduce((total, item) => total + item.quantity, 0)
      const price = cart.reduce((total, item) => total + item.price * item.quantity, 0)

      setTotalItems(items)
      setTotalPrice(price)
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [cart, isInitialized])

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1, selectedSize = null) => {
    if (!product || !product.id) {
      console.error("Invalid product:", product)
      return
    }

    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      )

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity

        // Show toast notification
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedCart[existingItemIndex].quantity}`,
          type: "success",
        })

        return updatedCart
      } else {
        // Add new item to cart
        // Show toast notification
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
          type: "success",
        })

        return [...prevCart, { ...product, quantity, selectedSize }]
      }
    })

    // Open cart sidebar when adding items
    setIsOpen(true)
  }, [])

  // Remove item from cart
  const removeFromCart = useCallback((productId, selectedSize = null) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === productId && item.selectedSize === selectedSize)
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
          type: "info",
        })
      }
      return prevCart.filter((item) => !(item.id === productId && item.selectedSize === selectedSize))
    })
  }, [])

  // Update item quantity
  const updateQuantity = useCallback(
    (productId, quantity, selectedSize = null) => {
      if (quantity <= 0) {
        removeFromCart(productId, selectedSize)
        return
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId && item.selectedSize === selectedSize ? { ...item, quantity } : item,
        ),
      )
    },
    [removeFromCart],
  )

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([])
    localStorage.removeItem("cart")
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      type: "info",
    })
  }, [])

  // Toggle cart sidebar
  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isOpen,
    setIsOpen,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
