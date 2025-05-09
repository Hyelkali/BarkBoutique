"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileUpload } from "../../components/FileUpload"
import { X } from "lucide-react"

export default function AddProduct() {
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (url) => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }))
  }

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add your product submission logic here
      // This would typically involve a call to your backend API

      // Navigate back to products page after successful submission
      navigate("/admin/products")
    } catch (error) {
      console.error("Error adding product:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl p-6 rounded-lg shadow-lg bg-dark-800">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Product Details */}
          <div className="space-y-4 md:col-span-2">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-1 text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Price and Category */}
          <div>
            <label htmlFor="price" className="block mb-1 text-sm font-medium">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full px-3 py-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block mb-1 text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a category</option>
              <option value="toys">Toys</option>
              <option value="beds">Beds</option>
              <option value="food">Food</option>
              <option value="accessories">Accessories</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block mb-1 text-sm font-medium">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-sm font-medium">Product Images</label>

            {/* Display uploaded images */}
            {product.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-3">
                {product.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-full h-32 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute p-1 transition-opacity rounded-full opacity-0 top-2 right-2 bg-dark-900/80 group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload component */}
            <FileUpload onUploadComplete={handleImageUpload} folder="products" buttonText="Add Product Image" />

            <p className="mt-2 text-xs text-gray-400">
              Upload up to 5 images. Max size: 5MB each. Supported formats: JPG, PNG, WebP.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 mr-4 transition-colors border rounded-md border-dark-600 hover:bg-dark-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || product.images.length === 0}
            className="px-4 py-2 transition-colors rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  )
}
