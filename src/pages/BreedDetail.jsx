"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { CartIcon } from "../components/CartIcon"
import { CartSidebar } from "../components/CartSidebar"
import { ArrowLeft, PawPrint, Activity, Thermometer, Droplets } from "lucide-react"
import { getBreedById } from "../data/breeds"
import { getProductById } from "../data/products"
import { ProductCard } from "../components/HoodieCard"

export default function BreedDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [breed, setBreed] = useState(null)
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const breedData = getBreedById(id)

    if (breedData) {
      setBreed(breedData)

      // Get recommended products
      const products = breedData.recommendedProducts.map((productId) => getProductById(productId)).filter(Boolean)
      setRecommendedProducts(products)
    }

    setLoading(false)
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!breed) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Breed Not Found</h2>
          <Button onClick={() => navigate("/breeds")}>Back to Breeds</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Fixed Cart Icon */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon />
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate("/breeds")}>
          <ArrowLeft className="w-4 h-4" /> Back to Breeds
        </Button>
      </div>

      {/* Breed Hero */}
      <section className="bg-dark-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={breed.image || "/placeholder.svg"}
                  alt={breed.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{breed.name}</h1>
              <p className="text-gray-300 mb-6">{breed.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-700 p-4 rounded-lg flex items-start">
                  <PawPrint className="w-5 h-5 mr-3 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Size</h3>
                    <p className="text-gray-400">{breed.size}</p>
                  </div>
                </div>

                <div className="bg-dark-700 p-4 rounded-lg flex items-start">
                  <Activity className="w-5 h-5 mr-3 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Activity Level</h3>
                    <p className="text-gray-400">{breed.activity}</p>
                  </div>
                </div>

                <div className="bg-dark-700 p-4 rounded-lg flex items-start">
                  <Droplets className="w-5 h-5 mr-3 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Shedding</h3>
                    <p className="text-gray-400">{breed.shedding}</p>
                  </div>
                </div>

                <div className="bg-dark-700 p-4 rounded-lg flex items-start">
                  <Thermometer className="w-5 h-5 mr-3 text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Temperament</h3>
                    <p className="text-gray-400">{breed.characteristics.slice(0, 2).join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Characteristics</h3>
                <div className="flex flex-wrap gap-2">
                  {breed.characteristics.map((char, index) => (
                    <span key={index} className="bg-dark-600 px-3 py-1 rounded-full text-sm">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="bg-dark-900 py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Recommended for {breed.name}s
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product, index) => (
              <Link to={`/product/${product.id}`} key={product.id} className="block">
                <ProductCard {...product} />
              </Link>
            ))}
          </div>

          {recommendedProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No specific products recommended for this breed yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Care Tips */}
      <section className="bg-dark-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Care Tips for {breed.name}s</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Exercise Needs</h3>
              <p className="text-gray-300">
                {breed.activity === "High"
                  ? `${breed.name}s are high-energy dogs that need plenty of exercise. Aim for at least 60-90 minutes of activity daily, including walks, runs, and play sessions.`
                  : breed.activity === "Moderate"
                    ? `${breed.name}s have moderate energy levels and typically need 30-60 minutes of exercise daily through walks and play.`
                    : `${breed.name}s have lower energy levels and are content with gentle walks and moderate play. About 30 minutes of activity daily is usually sufficient.`}
              </p>
            </div>

            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Grooming</h3>
              <p className="text-gray-300">
                {breed.shedding === "High"
                  ? `With their high shedding coat, ${breed.name}s need frequent brushing (3-4 times weekly) to manage loose fur and prevent matting.`
                  : breed.shedding === "Moderate"
                    ? `${breed.name}s have moderate shedding and benefit from brushing 1-2 times per week to remove loose fur and distribute natural oils.`
                    : `${breed.name}s are low shedding dogs that require minimal coat maintenance. Brushing once a week is typically sufficient.`}
              </p>
            </div>

            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Training Approach</h3>
              <p className="text-gray-300">
                {breed.characteristics.some((c) => ["Intelligent", "Smart"].includes(c))
                  ? `${breed.name}s are highly intelligent and learn quickly. They respond well to positive reinforcement and need mental challenges to prevent boredom.`
                  : breed.characteristics.some((c) => ["Stubborn", "Independent"].includes(c))
                    ? `${breed.name}s can be independent-minded. Training should be consistent, patient, and positive, with plenty of rewards for good behavior.`
                    : `${breed.name}s are generally eager to please and respond well to positive, reward-based training methods.`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
