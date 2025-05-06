"use client"

import React from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./CartContext"

export function CartIcon() {
  const { toggleCart, totalItems } = useCart()
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300) // Reset after animation
    toggleCart()
  }

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full bg-dark-400 hover:bg-dark-300 transition-colors duration-200 relative ${
        isClicked ? "animate-click" : ""
      }`}
    >
      <ShoppingCart className="w-6 h-6 text-gray-100" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-dark-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </button>
  )
}
