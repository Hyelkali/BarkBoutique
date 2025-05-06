"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useTheme } from "./ThemeContext"

export function AnimatedCategories({ categories }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const { isDark } = useTheme()

  // Category images - in a real app, these would come from your data
  const categoryImages = {
    Accessories:
      "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    Bedding:
      "https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    Toys: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    Food: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  }

  return (
    <div ref={containerRef} className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
        <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Find the perfect products for your furry friend
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            className="category-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <Link to={`/shop?category=${category}`} className="block h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={
                    categoryImages[category] ||
                    `https://source.unsplash.com/random/600x400/?dog,${category.toLowerCase()}`
                  }
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className={`absolute inset-0 ${isDark ? "bg-dark-900/60" : "bg-black/40"} flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-center p-4"
                  >
                    <p className="text-lg font-bold mb-2">{category}</p>
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              <div className={`p-4 ${isDark ? "bg-dark-800" : "bg-white"}`}>
                <h3 className="text-lg font-bold mb-1">{category}</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}>
                  {getDescriptionForCategory(category)}
                </p>
                <div className="flex items-center text-sm">
                  <span className={isDark ? "text-blue-400" : "text-blue-600"}>Explore Collection</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="ml-1"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Helper function to get descriptions for categories
function getDescriptionForCategory(category) {
  const descriptions = {
    Accessories: "Stylish and functional collars, leashes, and more",
    Bedding: "Comfortable beds and mats for a good night's sleep",
    Toys: "Interactive and durable toys for endless fun",
    Food: "Premium nutrition for your dog's health and happiness",
  }

  return descriptions[category] || "Quality products for your furry friend"
}
