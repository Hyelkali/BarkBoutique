"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "./ThemeContext"

export function TrustedBrands() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const { isDark } = useTheme()

  const brands = [
    {
      name: "PawPerfect",
      logo: "https://cdn-icons-png.flaticon.com/512/1076/1076877.png",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Premium dog food and treats",
    },
    {
      name: "BarkBuddy",
      logo: "https://cdn-icons-png.flaticon.com/512/1076/1076878.png",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Innovative dog toys and accessories",
    },
    {
      name: "FurryFriend",
      logo: "https://cdn-icons-png.flaticon.com/512/1076/1076879.png",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Luxury dog beds and furniture",
    },
    {
      name: "WoofWear",
      logo: "https://cdn-icons-png.flaticon.com/512/1076/1076880.png",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Stylish dog apparel and accessories",
    },
  ]

  return (
    <section ref={containerRef} className={`py-16 ${isDark ? "bg-dark-800" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Trusted Brands
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              className={`rounded-lg overflow-hidden ${isDark ? "bg-dark-700" : "bg-white"} shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={brand.image || "/placeholder.svg"}
                  alt={`${brand.name} featured dog`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="w-10 h-10 mr-3" />
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                </div>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>{brand.description}</p>
                <motion.button
                  className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"} flex items-center`}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  View Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
