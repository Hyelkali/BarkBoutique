"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        // Item exists, update quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })

    // Open cart sidebar when adding items
    setIsOpen(true)
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsOpen((prevState) => !prevState)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
