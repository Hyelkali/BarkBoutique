"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ProductCard } from "../components/HoodieCard"
import { AutoSliderBanner } from "../components/AutoSliderBanner"
import { CartSidebar } from "../components/CartSidebar"
import { ProductFilters } from "../components/ProductFilters"
import { AnimatedCategories } from "../components/AnimatedCategories"
import { TrustedBrands } from "../components/TrustedBrands"
import products, { getCategories } from "../data/products"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { TrendingUp, Award, Truck } from "lucide-react"
import { Button } from "../components/ui/button"
import { useTheme } from "../components/ThemeContext"

export default function Home() {
  const [filters, setFilters] = useState({
    category: null,
    size: null,
    priceRange: [0, 200],
    searchQuery: "",
  })
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [visibleProducts, setVisibleProducts] = useState(8)
  const categories = getCategories()
  const { isDark } = useTheme()

  // Refs for scroll animations
  const featuresRef = useRef(null)
  const productsRef = useRef(null)
  const testimonialsRef = useRef(null)

  // Check if sections are in view
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const productsInView = useInView(productsRef, { once: true, amount: 0.1 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  // Apply filters to products
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Filter by category
      if (filters.category && product.category !== filters.category) {
        return false
      }

      // Filter by size
      if (filters.size && (!product.sizes || !product.sizes.includes(filters.size))) {
        return false
      }

      // Filter by price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Filter by search query
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false
      }

      return true
    })

    setFilteredProducts(filtered)
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => Math.min(prev + 8, filteredProducts.length))
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Full-screen Auto-sliding Banner */}
      <section className="relative w-full h-screen overflow-hidden">
        <motion.div style={{ y: heroY }}>
          <AutoSliderBanner />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div
            className={`w-8 h-12 border-2 ${isDark ? "border-white" : "border-gray-800"} rounded-full flex justify-center`}
          >
            <motion.div
              className={`w-1 h-3 ${isDark ? "bg-white" : "bg-gray-800"} rounded-full mt-2`}
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className={`w-full py-16 ${isDark ? "bg-dark-800" : "bg-gray-100"}`}>
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose BarkBoutique?</h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Premium products for your furry friends, designed with love and care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Truck className="w-10 h-10" />,
                title: "Free Shipping",
                description: "On orders over $50",
              },
              {
                icon: (
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    🔄
                  </motion.div>
                ),
                title: "Easy Returns",
                description: "30-day return policy",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Quality Guarantee",
                description: "Tested for durability",
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "Trending Designs",
                description: "Updated seasonally",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${isDark ? "bg-dark-700" : "bg-white"} p-6 rounded-lg text-center shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`w-full py-16 ${isDark ? "bg-dark-900" : "bg-white"}`}>
        <div className="container px-4 mx-auto">
          <AnimatedCategories categories={categories} />
        </div>
      </section>

      {/* Product Section */}
      <section
        ref={productsRef}
        id="product-section"
        className={`w-full py-16 md:py-24 ${isDark ? "bg-dark-800" : "bg-gray-100"}`}
      >
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">Featured Products</h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-center max-w-2xl mx-auto mb-12`}>
              Discover our most popular items loved by dogs and their owners
            </p>
          </motion.div>

          {/* Product Filters */}
          <ProductFilters categories={categories} onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {filteredProducts.slice(0, visibleProducts).map((product, index) => (
              <Link to={`/product/${product.id}`} key={product.id} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={productsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1) }}
                >
                  <ProductCard {...product} />
                </motion.div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>No products match your filters.</p>
            </div>
          )}

          {visibleProducts < filteredProducts.length && (
            <div className="mt-12 text-center">
              <Button onClick={loadMoreProducts} variant="outline" size="lg" className="group">
                Load More Products
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Trusted Brands Section */}
      <TrustedBrands />

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className={`w-full py-16 ${isDark ? "bg-dark-900" : "bg-white"}`}>
        <div className="container px-4 mx-auto">
          <motion.h2
            className="mb-12 text-3xl font-bold text-center md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What Dog Parents Say
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah & Max",
                image:
                  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                text: "The orthopedic bed has been a game-changer for my senior Labrador. His joints are much better now!",
              },
              {
                name: "Mike & Bella",
                image:
                  "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                text: "The interactive puzzle toy keeps my Border Collie entertained for hours. Mental stimulation at its best!",
              },
              {
                name: "Emma & Cooper",
                image:
                  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                text: "Premium quality collar that's both stylish and durable. We get compliments on every walk!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${isDark ? "bg-dark-700" : "bg-gray-100"} p-6 rounded-lg shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="w-12 h-12 mr-4 overflow-hidden border-2 border-white rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                </div>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} italic`}>"{testimonial.text}"</p>

                {/* Star rating */}
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={testimonialsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + star * 0.1 }}
                      className="mr-1"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`w-full py-16 ${isDark ? "bg-dark-800" : "bg-gray-100"}`}>
        <div className="container px-4 mx-auto">
          <div className={`${isDark ? "bg-dark-700" : "bg-white"} p-8 md:p-12 rounded-lg shadow-md`}>
            <div className="max-w-3xl mx-auto text-center">
              <motion.h3
                className="mb-4 text-2xl font-bold md:text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Pack
              </motion.h3>
              <motion.p
                className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Subscribe to our newsletter for exclusive offers, new product alerts, and expert dog care tips.
              </motion.p>
              <motion.div
                className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`flex-grow px-4 py-3 ${
                    isDark ? "bg-dark-600 border border-dark-500" : "bg-gray-100 border border-gray-200"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <Button className="sm:flex-shrink-0">Subscribe</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
