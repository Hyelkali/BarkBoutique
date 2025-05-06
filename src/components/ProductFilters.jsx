"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Sliders, X, Search, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getDogSizes } from "../data/products"

export function ProductFilters({ categories, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSection, setExpandedSection] = useState(null)

  const dogSizes = getDogSizes()

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    applyFilters(category, selectedSize, priceRange, searchQuery)
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size)
    applyFilters(selectedCategory, size, priceRange, searchQuery)
  }

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange]
    newPriceRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newPriceRange)
    applyFilters(selectedCategory, selectedSize, newPriceRange, searchQuery)
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    applyFilters(selectedCategory, selectedSize, priceRange, query)
  }

  const applyFilters = (category, size, price, query) => {
    onFilterChange({
      category: category === "all" ? null : category,
      size: size === "all" ? null : size,
      priceRange: price,
      searchQuery: query,
    })
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedSize("all")
    setPriceRange([0, 200])
    setSearchQuery("")
    onFilterChange({
      category: null,
      size: null,
      priceRange: [0, 200],
      searchQuery: "",
    })
  }

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Shop Dog Products</h2>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-dark-800 p-4 rounded-lg mb-4">
              {isMobile ? (
                // Mobile accordion style filters
                <div className="space-y-4">
                  <div className="border-b border-dark-600 pb-4">
                    <button
                      className="flex justify-between items-center w-full text-left font-medium"
                      onClick={() => toggleSection("categories")}
                    >
                      <span>Categories</span>
                      {expandedSection === "categories" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSection === "categories" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant={selectedCategory === "all" ? "default" : "ghost"}
                              onClick={() => handleCategoryChange("all")}
                            >
                              All
                            </Button>
                            {categories.map((category) => (
                              <Button
                                key={category}
                                size="sm"
                                variant={selectedCategory === category ? "default" : "ghost"}
                                onClick={() => handleCategoryChange(category)}
                              >
                                {category}
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-b border-dark-600 pb-4">
                    <button
                      className="flex justify-between items-center w-full text-left font-medium"
                      onClick={() => toggleSection("sizes")}
                    >
                      <span>Dog Size</span>
                      {expandedSection === "sizes" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSection === "sizes" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant={selectedSize === "all" ? "default" : "ghost"}
                              onClick={() => handleSizeChange("all")}
                            >
                              All Sizes
                            </Button>
                            {dogSizes.map((size) => (
                              <Button
                                key={size}
                                size="sm"
                                variant={selectedSize === size ? "default" : "ghost"}
                                onClick={() => handleSizeChange(size)}
                              >
                                {size}
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-b border-dark-600 pb-4">
                    <button
                      className="flex justify-between items-center w-full text-left font-medium"
                      onClick={() => toggleSection("price")}
                    >
                      <span>Price Range</span>
                      {expandedSection === "price" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSection === "price" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm mb-1">Minimum: ${priceRange[0]}</label>
                              <input
                                type="range"
                                min="0"
                                max="200"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, 0)}
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Maximum: ${priceRange[1]}</label>
                              <input
                                type="range"
                                min="0"
                                max="200"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, 1)}
                                className="w-full"
                              />
                            </div>
                            <div className="text-center font-medium">
                              ${priceRange[0]} - ${priceRange[1]}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                // Desktop layout
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedCategory === "all" ? "default" : "ghost"}
                        onClick={() => handleCategoryChange("all")}
                      >
                        All
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          size="sm"
                          variant={selectedCategory === category ? "default" : "ghost"}
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Dog Size</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedSize === "all" ? "default" : "ghost"}
                        onClick={() => handleSizeChange("all")}
                      >
                        All Sizes
                      </Button>
                      {dogSizes.map((size) => (
                        <Button
                          key={size}
                          size="sm"
                          variant={selectedSize === size ? "default" : "ghost"}
                          onClick={() => handleSizeChange(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                  <span className="text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button size="sm" variant="ghost" onClick={resetFilters} className="flex items-center gap-1">
                  <X className="w-3 h-3" /> Reset Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
