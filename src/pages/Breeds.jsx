"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CartIcon } from "../components/CartIcon"
import { CartSidebar } from "../components/CartSidebar"
import breeds from "../data/breeds"
import { Button } from "../components/ui/button"
import { Search } from "lucide-react"

export default function Breeds() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSize, setActiveSize] = useState("all")
  const [activeActivity, setActiveActivity] = useState("all")

  // Filter breeds based on search and filters
  const filteredBreeds = breeds.filter((breed) => {
    // Search filter
    if (
      searchQuery &&
      !breed.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !breed.characteristics.some((char) => char.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Size filter
    if (activeSize !== "all") {
      if (
        (activeSize === "small" && !breed.size.toLowerCase().includes("small")) ||
        (activeSize === "medium" && !breed.size.toLowerCase().includes("medium")) ||
        (activeSize === "large" && !breed.size.toLowerCase().includes("large"))
      ) {
        return false
      }
    }

    // Activity filter
    if (activeActivity !== "all") {
      if (
        (activeActivity === "low" && !breed.activity.toLowerCase().includes("low")) ||
        (activeActivity === "moderate" && !breed.activity.toLowerCase().includes("moderate")) ||
        (activeActivity === "high" && !breed.activity.toLowerCase().includes("high"))
      ) {
        return false
      }
    }

    return true
  })

  return (
    <main className="flex min-h-screen flex-col">
      {/* Fixed Cart Icon */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon />
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Dogs of different breeds"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Breed Collections
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find the perfect products for your dog's specific breed, size, and activity level
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-dark-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Browse by Breed</h2>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search breeds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Filter buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={activeSize === "all" ? "default" : "outline"}
                  onClick={() => setActiveSize("all")}
                >
                  All Sizes
                </Button>
                <Button
                  size="sm"
                  variant={activeSize === "small" ? "default" : "outline"}
                  onClick={() => setActiveSize("small")}
                >
                  Small
                </Button>
                <Button
                  size="sm"
                  variant={activeSize === "medium" ? "default" : "outline"}
                  onClick={() => setActiveSize("medium")}
                >
                  Medium
                </Button>
                <Button
                  size="sm"
                  variant={activeSize === "large" ? "default" : "outline"}
                  onClick={() => setActiveSize("large")}
                >
                  Large
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Activity Level</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={activeActivity === "all" ? "default" : "outline"}
                  onClick={() => setActiveActivity("all")}
                >
                  All Levels
                </Button>
                <Button
                  size="sm"
                  variant={activeActivity === "low" ? "default" : "outline"}
                  onClick={() => setActiveActivity("low")}
                >
                  Low
                </Button>
                <Button
                  size="sm"
                  variant={activeActivity === "moderate" ? "default" : "outline"}
                  onClick={() => setActiveActivity("moderate")}
                >
                  Moderate
                </Button>
                <Button
                  size="sm"
                  variant={activeActivity === "high" ? "default" : "outline"}
                  onClick={() => setActiveActivity("high")}
                >
                  High
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breeds Grid */}
      <section className="bg-dark-900 py-12">
        <div className="container mx-auto px-4">
          {filteredBreeds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No breeds match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBreeds.map((breed, index) => (
                <Link to={`/breed/${breed.id}`} key={breed.id}>
                  <motion.div
                    className="bg-dark-800 rounded-lg overflow-hidden h-full"
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={breed.image || "/placeholder.svg"}
                        alt={breed.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{breed.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-dark-700 px-2 py-1 rounded-full text-xs">Size: {breed.size}</span>
                        <span className="bg-dark-700 px-2 py-1 rounded-full text-xs">Activity: {breed.activity}</span>
                        <span className="bg-dark-700 px-2 py-1 rounded-full text-xs">Shedding: {breed.shedding}</span>
                      </div>
                      <p className="text-gray-400 mb-4 line-clamp-2">{breed.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {breed.characteristics.slice(0, 3).map((char, i) => (
                          <span key={i} className="text-xs text-gray-300">
                            {char}
                            {i < Math.min(breed.characteristics.length, 3) - 1 && " • "}
                          </span>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full">
                        View Collection
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
