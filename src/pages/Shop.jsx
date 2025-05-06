"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ProductCard } from "../components/HoodieCard"
import { ProductFilters } from "../components/ProductFilters"
import { CartSidebar } from "../components/CartSidebar"
import { Button } from "../components/ui/button"
import products, { getCategories } from "../data/products"
import { ChevronLeft, ChevronRight, SlidersHorizontal, Grid3X3, List } from "lucide-react"

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || null,
    size: searchParams.get("size") || null,
    priceRange: [
      Number.parseInt(searchParams.get("minPrice") || "0"),
      Number.parseInt(searchParams.get("maxPrice") || "200"),
    ],
    searchQuery: searchParams.get("search") || "",
  })
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page") || "1"))
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured")
  const [viewMode, setViewMode] = useState("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const productsPerPage = 12
  const categories = getCategories()

  // Refs for scroll animations
  const headerRef = useRef(null)
  const filtersRef = useRef(null)
  const productsRef = useRef(null)

  // Parallax effect for header
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, 50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.6])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.category) params.set("category", filters.category)
    if (filters.size) params.set("size", filters.size)
    params.set("minPrice", filters.priceRange[0].toString())
    params.set("maxPrice", filters.priceRange[1].toString())
    if (filters.searchQuery) params.set("search", filters.searchQuery)
    params.set("page", currentPage.toString())
    params.set("sort", sortBy)
    setSearchParams(params)
  }, [filters, currentPage, sortBy, setSearchParams])

  // Apply filters and sorting to products
  useEffect(() => {
    let filtered = [...products]

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Apply size filter
    if (filters.size) {
      filtered = filtered.filter((product) => product.sizes && product.sizes.includes(filters.size))
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      case "featured":
      default:
        // Keep default order or implement featured logic
        break
    }

    setFilteredProducts(filtered)

    // Reset to first page when filters change
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [filters, sortBy])

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top of products section
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning or end
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Shop Header */}
      <motion.section
        ref={headerRef}
        className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden bg-dark-800"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Shop Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 to-dark-900/70" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shop All Products
          </motion.h1>
          <motion.div
            className="flex items-center text-sm text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Shop</span>
            {filters.category && (
              <>
                <span className="mx-2">/</span>
                <span>{filters.category}</span>
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Shop Content */}
      <section className="bg-dark-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <motion.aside
              ref={filtersRef}
              className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-dark-800 rounded-lg p-4 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Filters</h2>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => handleFilterChange({ category: null })}
                        className={`w-full text-left py-1 px-2 rounded-md transition-colors ${!filters.category ? "bg-dark-700 text-white" : "text-gray-400 hover:text-white"}`}
                      >
                        All Categories
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => handleFilterChange({ category })}
                          className={`w-full text-left py-1 px-2 rounded-md transition-colors ${filters.category === category ? "bg-dark-700 text-white" : "text-gray-400 hover:text-white"}`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handleFilterChange({
                          priceRange: [Number.parseInt(e.target.value), filters.priceRange[1]],
                        })
                      }
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleFilterChange({
                          priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterChange({ size: null })}
                      className={`px-3 py-1 rounded-md text-sm ${!filters.size ? "bg-dark-600 text-white" : "bg-dark-700 text-gray-400 hover:text-white"}`}
                    >
                      All
                    </button>
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange({ size })}
                        className={`px-3 py-1 rounded-md text-sm ${filters.size === size ? "bg-dark-600 text-white" : "bg-dark-700 text-gray-400 hover:text-white"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    handleFilterChange({
                      category: null,
                      size: null,
                      priceRange: [0, 200],
                      searchQuery: "",
                    })
                  }
                >
                  Reset Filters
                </Button>
              </div>
            </motion.aside>

            {/* Mobile Filters Toggle */}
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="bg-dark-800 rounded-lg p-4">
                      <ProductFilters
                        categories={categories}
                        onFilterChange={handleFilterChange}
                        initialFilters={filters}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Grid */}
            <motion.div
              ref={productsRef}
              className="flex-grow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-dark-800 p-4 rounded-lg">
                <div className="text-sm text-gray-300">
                  Showing {Math.min(filteredProducts.length, (currentPage - 1) * productsPerPage + 1)}-
                  {Math.min(filteredProducts.length, currentPage * productsPerPage)} of {filteredProducts.length}{" "}
                  products
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex-grow sm:flex-grow-0">
                    <select
                      value={sortBy}
                      onChange={handleSortChange}
                      className="w-full sm:w-auto bg-dark-700 border border-dark-600 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  <div className="hidden sm:flex items-center gap-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1 rounded ${viewMode === "grid" ? "bg-dark-600 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1 rounded ${viewMode === "list" ? "bg-dark-600 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* No Results */}
              {currentProducts.length === 0 && (
                <div className="bg-dark-800 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-400 mb-4">Try adjusting your filters or search criteria.</p>
                  <Button
                    onClick={() =>
                      handleFilterChange({
                        category: null,
                        size: null,
                        priceRange: [0, 200],
                        searchQuery: "",
                      })
                    }
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}

              {/* Products Grid View */}
              {viewMode === "grid" && currentProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/product/${product.id}`}>
                        <ProductCard {...product} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Products List View */}
              {viewMode === "list" && currentProducts.length > 0 && (
                <div className="space-y-6">
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="bg-dark-800 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/product/${product.id}`} className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 md:w-64">
                          <div className="aspect-square sm:h-full relative overflow-hidden">
                            <img
                              src={product.image1 || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 bg-dark-900 text-white text-xs px-2 py-1 rounded-full">
                              {product.category}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                          <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      ),
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </nav>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
