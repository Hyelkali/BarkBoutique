"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { upload } from "@vercel/blob/client"
import { getProductById, getCategories } from "../../data/products"

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    sizes: [],
    features: [],
    forBreeds: [],
    bestFor: [],
  })

  const [image1File, setImage1File] = useState(null)
  const [image2File, setImage2File] = useState(null)
  const [image1Preview, setImage1Preview] = useState("")
  const [image2Preview, setImage2Preview] = useState("")

  const categories = getCategories()

  useEffect(() => {
    // Fetch product data
    const productId = Number.parseInt(id)
    const product = getProductById(productId)

    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        sizes: product.sizes || [],
        features: product.features || [],
        forBreeds: product.forBreeds || [],
        bestFor: product.bestFor || [],
      })

      setImage1Preview(product.image1)
      setImage2Preview(product.image2)
    } else {
      setError("Product not found")
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleArrayInputChange = (e, field, index) => {
    const { value } = e.target
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({
      ...formData,
      [field]: newArray,
    })
  }

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    })
  }

  const removeArrayItem = (field, index) => {
    const newArray = [...formData[field]]
    newArray.splice(index, 1)
    setFormData({
      ...formData,
      [field]: newArray,
    })
  }

  const handleImage1Change = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage1File(file)
      setImage1Preview(URL.createObjectURL(file))
    }
  }

  const handleImage2Change = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage2File(file)
      setImage2Preview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate form
      if (!formData.name || !formData.price || !formData.category || !formData.description) {
        throw new Error("Please fill in all required fields")
      }

      // Upload images to Vercel Blob if new images were selected
      let image1Url = image1Preview
      let image2Url = image2Preview

      if (image1File) {
        const blob1 = await upload(image1File.name, image1File, {
          access: "public",
          handleUploadUrl: "/api/upload",
        })
        image1Url = blob1.url
      }

      if (image2File) {
        const blob2 = await upload(image2File.name, image2File, {
          access: "public",
          handleUploadUrl: "/api/upload",
        })
        image2Url = blob2.url
      }

      // Update product
      const updatedProduct = {
        id: Number.parseInt(id),
        name: formData.name,
        price: Number.parseFloat(formData.price),
        image1: image1Url,
        image2: image2Url,
        category: formData.category,
        description: formData.description,
        sizes: formData.sizes,
        features: formData.features.filter((f) => f.trim() !== ""),
        forBreeds: formData.forBreeds,
        bestFor: formData.bestFor.filter((b) => b.trim() !== ""),
      }

      // In a real app, you would save this to a database
      console.log("Updated product:", updatedProduct)

      // Redirect to products page
      navigate("/admin/products")
    } catch (err) {
      console.error("Error updating product:", err)
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Edit Product</h1>
          <button
            onClick={() => navigate("/admin/products")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white dark:hover:bg-dark-600"
          >
            Cancel
          </button>
        </div>

        {error && <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image 1</label>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-24 w-24 border border-gray-300 dark:border-dark-600 rounded-md overflow-hidden bg-gray-100 dark:bg-dark-700">
                  {image1Preview ? (
                    <img
                      src={image1Preview || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="image1"
                    accept="image/*"
                    onChange={handleImage1Change}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:text-gray-400 dark:file:bg-primary-900 dark:file:text-primary-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image 2</label>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-24 w-24 border border-gray-300 dark:border-dark-600 rounded-md overflow-hidden bg-gray-100 dark:bg-dark-700">
                  {image2Preview ? (
                    <img
                      src={image2Preview || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="image2"
                    accept="image/*"
                    onChange={handleImage2Change}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:text-gray-400 dark:file:bg-primary-900 dark:file:text-primary-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Sizes</label>
              <div className="space-y-2">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => handleArrayInputChange(e, "sizes", index)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                    />
                    {formData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("sizes", index)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("sizes")}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
                >
                  Add Size
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features</label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayInputChange(e, "features", index)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                      placeholder="Product feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("features")}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
                >
                  Add Feature
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">For Breeds</label>
              <div className="space-y-2">
                {formData.forBreeds.map((breed, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={breed}
                      onChange={(e) => handleArrayInputChange(e, "forBreeds", index)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                      placeholder="Suitable for breed"
                    />
                    {formData.forBreeds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("forBreeds", index)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("forBreeds")}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
                >
                  Add Breed
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Best For</label>
              <div className="space-y-2">
                {formData.bestFor.map((use, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={use}
                      onChange={(e) => handleArrayInputChange(e, "bestFor", index)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                      placeholder="Best use case"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("bestFor", index)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("bestFor")}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
                >
                  Add Use Case
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default EditProduct
