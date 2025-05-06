"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useCart } from "../components/CartContext"
import { ArrowLeft, Heart, Share2, ShoppingBag, Check, Star, ChevronDown, ChevronUp } from "lucide-react"
import { getProductById } from "../data/products"
import { motion, useInView } from "framer-motion"
import { ProductCard } from "../components/HoodieCard"
import { ProductReviews } from "../components/ProductReviews"
import { ProductGallery } from "../components/ProductGallery"
import { getAverageRating, getReviewCount } from "../data/reviews"
import products from "../data/products"
import { useTheme } from "../components/ThemeContext"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [expandedSection, setExpandedSection] = useState(null)
  const { isDark } = useTheme()

  // Refs for scroll animations
  const detailsRef = useRef(null)
  const relatedRef = useRef(null)
  const reviewsRef = useRef(null)

  // Check if sections are in view
  const detailsInView = useInView(detailsRef, { once: true, amount: 0.2 })
  const relatedInView = useInView(relatedRef, { once: true, amount: 0.2 })
  const reviewsInView = useInView(reviewsRef, { once: true, amount: 0.2 })

  useEffect(() => {
    // Simulate loading product data
    setLoading(true)
    const fetchedProduct = getProductById(Number.parseInt(id))

    if (fetchedProduct) {
      setProduct(fetchedProduct)
      // Set default selected size
      if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
        setSelectedSize(fetchedProduct.sizes[0])
      }
      // Add additional images for the product detail page
      fetchedProduct.images = [
        fetchedProduct.image1,
        fetchedProduct.image2,
        fetchedProduct.image1, // Duplicate for demo purposes
        fetchedProduct.image2, // Duplicate for demo purposes
      ]
    }

    setLoading(false)

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert("Please select a size")
      return
    }

    addToCart({
      ...product,
      selectedSize,
      quantity,
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Get product rating
  const averageRating = getAverageRating(Number.parseInt(id))
  const reviewCount = getReviewCount(Number.parseInt(id))

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm">
          <Link
            to="/"
            className={`hover:${isDark ? "text-white" : "text-gray-900"} transition-colors ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/shop"
            className={`hover:${isDark ? "text-white" : "text-gray-900"} transition-colors ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className={isDark ? "text-white" : "text-gray-900"}>{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => navigate("/shop")}>
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : isDark
                          ? "text-gray-500"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-sm ml-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {averageRating > 0 ? `${averageRating} (${reviewCount} reviews)` : "No reviews yet"}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-4 mb-6">
              <div className={`border-b ${isDark ? "border-dark-600" : "border-gray-200"} pb-2`}>
                <button
                  className="flex justify-between items-center w-full py-2"
                  onClick={() => toggleSection("description")}
                >
                  <span className="font-medium">Description</span>
                  {expandedSection === "description" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSection === "description" && (
                  <div className={`pt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              <div className={`border-b ${isDark ? "border-dark-600" : "border-gray-200"} pb-2`}>
                <button
                  className="flex justify-between items-center w-full py-2"
                  onClick={() => toggleSection("features")}
                >
                  <span className="font-medium">Features</span>
                  {expandedSection === "features" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSection === "features" && (
                  <div className="pt-2">
                    <ul className="space-y-2">
                      {product.features?.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className={`border-b ${isDark ? "border-dark-600" : "border-gray-200"} pb-2`}>
                <button
                  className="flex justify-between items-center w-full py-2"
                  onClick={() => toggleSection("sizing")}
                >
                  <span className="font-medium">Sizing</span>
                  {expandedSection === "sizing" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSection === "sizing" && (
                  <div className="pt-2">
                    <p className="mb-2">Available sizes:</p>
                    <ul className="list-disc list-inside">
                      {product.sizes?.map((size, index) => (
                        <li key={index}>{size}</li>
                      ))}
                    </ul>
                    <p className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Please refer to our size guide to find the perfect fit for your dog.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden md:block mb-6">
              <div className={`flex border-b ${isDark ? "border-dark-600" : "border-gray-200"} mb-4`}>
                {["description", "features", "sizing"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium ${
                      activeTab === tab
                        ? isDark
                          ? "border-b-2 border-white text-white"
                          : "border-b-2 border-gray-900 text-gray-900"
                        : isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className={isDark ? "text-gray-300" : "text-gray-600"}>
                {activeTab === "description" && <p>{product.description}</p>}

                {activeTab === "features" && (
                  <ul className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "sizing" && (
                  <div>
                    <p className="mb-2">Available sizes:</p>
                    <ul className="list-disc list-inside">
                      {product.sizes?.map((size, index) => (
                        <li key={index}>{size}</li>
                      ))}
                    </ul>
                    <p className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Please refer to our size guide to find the perfect fit for your dog.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Size</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-sm font-medium mb-2">Quantity</h2>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={decrementQuantity}>
                  -
                </Button>
                <span className="mx-4">{quantity}</span>
                <Button variant="outline" size="sm" onClick={incrementQuantity}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </Button>
              <Button variant="outline" onClick={toggleWishlist} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Heart className={`w-5 h-5 ${isWishlisted ? (isDark ? "fill-white" : "fill-gray-900") : ""}`} />
              </Button>
              <Button variant="outline" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Additional product info */}
            <div className={`${isDark ? "bg-dark-800" : "bg-gray-100"} p-4 rounded-lg`}>
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center ${isDark ? "bg-dark-700" : "bg-gray-200"} rounded-full mr-2`}
                >
                  🐶
                </div>
                <span className="font-medium">Best for:</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.bestFor?.map((item, index) => (
                  <span
                    key={index}
                    className={`${isDark ? "bg-dark-700" : "bg-gray-200"} px-2 py-1 rounded-full text-sm`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center ${isDark ? "bg-dark-700" : "bg-gray-200"} rounded-full mr-2`}
                >
                  🦮
                </div>
                <span className="font-medium">Suitable for breeds:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.forBreeds?.map((breed, index) => (
                  <span
                    key={index}
                    className={`${isDark ? "bg-dark-700" : "bg-gray-200"} px-2 py-1 rounded-full text-sm`}
                  >
                    {breed}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Reviews */}
        <div ref={reviewsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ProductReviews productId={Number.parseInt(id)} />
          </motion.div>
        </div>

        {/* Related products section */}
        <motion.div
          ref={relatedRef}
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={relatedInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/product/${relatedProduct.id}`} className="block">
                    <ProductCard {...relatedProduct} />
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
