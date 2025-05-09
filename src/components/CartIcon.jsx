"use client"

import React from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./CartContext"
import { motion } from "framer-motion"

export function CartIcon() {
  const { toggleCart, totalItems } = useCart()
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300) // Reset after animation
    toggleCart()
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`p-2 rounded-full bg-dark-400 hover:bg-dark-300 transition-colors duration-200 relative ${
        isClicked ? "animate-click" : ""
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ShoppingCart className="w-6 h-6 text-gray-100" />
      {totalItems > 0 && (
        <motion.span
          className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold bg-white rounded-full -top-1 -right-1 text-dark-900"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={totalItems}
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  )
}
