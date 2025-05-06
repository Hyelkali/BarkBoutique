"use client"

import { useState } from "react"
import { useCart } from "./CartContext"
import { Button } from "./ui/button"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export function ProductCard({ id, name, price, image1, image2, category }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking the button
    e.stopPropagation() // Stop event propagation

    // Add animation effect
    const button = e.currentTarget
    button.classList.add("animate-click")
    setTimeout(() => button.classList.remove("animate-click"), 300)

    addToCart({ id, name, price, image1, image2 })
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <motion.div
      className="bg-dark-800 rounded-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div
        className="relative aspect-square overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.img
          src={isHovered ? image2 : image1}
          alt={name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to={`/product/${id}`} className="transform transition-transform duration-300 hover:scale-110">
            <Button variant="outline" size="icon" className="rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
              <Eye className="w-5 h-5" />
            </Button>
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleWishlist}
            className="rounded-full p-2 bg-white bg-opacity-20 backdrop-blur-sm"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white text-white" : ""}`} />
          </motion.button>
        </div>
        <div className="absolute top-2 left-2 bg-dark-900 text-white text-xs px-2 py-1 rounded-full">{category}</div>

        {/* Sale badge - can be conditionally rendered */}
        {Math.random() > 0.7 && (
          <div className="absolute top-2 right-2 bg-white text-dark-900 text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-100 mb-1 line-clamp-2">{name}</h3>
        <p className="text-gray-400 mb-4">${price.toFixed(2)}</p>
        <Button
          className="w-full mt-auto flex items-center justify-center gap-2 group"
          variant="outline"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
          <span className="group-hover:translate-x-1 transition-transform">Add to Cart</span>
        </Button>
      </div>
    </motion.div>
  )
}
