"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ThumbsUp, X, AlertCircle } from "lucide-react"
import { Button } from "./ui/button"
import { getReviewsByProductId, getAverageRating, getReviewCount } from "../data/reviews"
import { useAuth } from "./AuthContext"
import { FileUpload } from "./FileUpload"
import { getBestAvatar } from "../utils/avatar"

export function ProductReviews({ productId }) {
  const { currentUser } = useAuth()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [expandedReview, setExpandedReview] = useState(null)
  const [expandedImage, setExpandedImage] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: "",
    comment: "",
    images: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const reviewFormRef = useRef(null)

  const reviews = getReviewsByProductId(productId)
  const averageRating = getAverageRating(productId)
  const reviewCount = getReviewCount(productId)

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else if (sortBy === "lowest") {
      return a.rating - b.rating
    } else if (sortBy === "helpful") {
      return b.helpfulCount - a.helpfulCount
    }
    return 0
  })

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleRatingClick = (rating) => {
    setReviewForm((prev) => ({ ...prev, rating }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReviewForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (url) => {
    setReviewForm((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }))
  }

  const removeImage = (index) => {
    setReviewForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    // Validate form
    if (reviewForm.rating === 0) {
      setFormError("Please select a rating")
      return
    }

    if (!reviewForm.title.trim()) {
      setFormError("Please enter a review title")
      return
    }

    if (!reviewForm.comment.trim()) {
      setFormError("Please enter a review comment")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would send the review to your backend
      console.log("Submitting review:", {
        productId,
        userId: currentUser?.uid,
        userName: currentUser?.displayName || "Anonymous",
        userImage: currentUser?.photoURL,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        images: reviewForm.images,
        date: new Date().toISOString(),
      })

      // Reset form and close it
      setReviewForm({
        rating: 0,
        title: "",
        comment: "",
        images: [],
      })
      setShowReviewForm(false)

      // In a real app, you would refresh the reviews here
    } catch (error) {
      setFormError("Failed to submit review. Please try again.")
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToReviewForm = () => {
    setShowReviewForm(true)
    setTimeout(() => {
      reviewFormRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

      {/* Reviews Summary */}
      <div className="p-6 mb-8 rounded-lg bg-dark-800">
        <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-3xl font-bold">{averageRating}</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-400">Based on {reviewCount} reviews</div>
          </div>

          <Button onClick={scrollToReviewForm}>Write a Review</Button>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              ref={reviewFormRef}
            >
              <div className="pt-6 border-t border-dark-600">
                <h3 className="mb-4 text-lg font-semibold">Share Your Experience</h3>

                {formError && (
                  <div className="flex items-start p-3 mb-4 border border-red-800 rounded-md bg-red-900/30">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400">{formError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Rating *</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          className="transition-colors focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= reviewForm.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-500 hover:text-yellow-500"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="title" className="block mb-1 text-sm font-medium">
                      Review Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={reviewForm.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-1 focus:ring-white"
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="comment" className="block mb-1 text-sm font-medium">
                      Review *
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={reviewForm.comment}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-2 border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-1 focus:ring-white"
                      placeholder="Share your experience with this product"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Add Photos (Optional)</label>

                    {/* Display uploaded images */}
                    {reviewForm.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {reviewForm.images.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Review ${index + 1}`}
                              className="object-cover w-full h-20 rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute p-1 transition-opacity rounded-full opacity-0 top-1 right-1 bg-dark-900/80 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {reviewForm.images.length < 3 && (
                      <FileUpload
                        onUploadComplete={handleImageUpload}
                        folder="reviews"
                        accept="image/*"
                        maxSizeMB={2}
                        buttonText="Add Photo"
                      />
                    )}

                    <p className="mt-1 text-xs text-gray-400">You can upload up to 3 images. Max size: 2MB each.</p>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)} className="mr-2">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium">{reviewCount} Reviews</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-1 text-sm border rounded-md bg-dark-700 border-dark-600 focus:outline-none focus:ring-1 focus:ring-white"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <motion.div
            key={review.id}
            className="p-6 rounded-lg bg-dark-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
                  <img
                    src={review.userImage || getBestAvatar({ displayName: review.userName })}
                    alt={review.userName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-xs text-gray-400">{formatDate(review.date)}</div>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-500"}`}
                  />
                ))}
              </div>
            </div>

            <h4 className="mb-2 font-semibold">{review.title}</h4>

            <div className="mb-4 text-gray-300">
              {expandedReview === review.id || review.comment.length <= 200 ? (
                review.comment
              ) : (
                <>
                  {review.comment.substring(0, 200)}...
                  <button className="ml-1 text-white underline" onClick={() => setExpandedReview(review.id)}>
                    Read more
                  </button>
                </>
              )}

              {expandedReview === review.id && review.comment.length > 200 && (
                <button className="block mt-2 text-white underline" onClick={() => setExpandedReview(null)}>
                  Show less
                </button>
              )}
            </div>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {review.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 overflow-hidden rounded-md cursor-pointer"
                      onClick={() => setExpandedImage(image)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Review ${index + 1}`}
                        className="object-cover w-full h-full transition-opacity hover:opacity-90"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-400">
                {review.verified && <span className="mr-2">✓ Verified Purchase</span>}
              </div>
              <button className="flex items-center text-sm text-gray-400 hover:text-white">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpfulCount})
              </button>
            </div>
          </motion.div>
        ))}

        {reviews.length === 0 && (
          <div className="py-8 text-center rounded-lg bg-dark-800">
            <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
            <Button className="mt-4" onClick={scrollToReviewForm}>
              Write a Review
            </Button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              className="absolute p-2 text-white bg-black bg-opacity-50 rounded-full top-4 right-4 hover:bg-opacity-70"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={expandedImage || "/placeholder.svg"}
              alt="Review"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
