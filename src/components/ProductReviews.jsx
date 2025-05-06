"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import { getReviewsByProductId, getAverageRating, getReviewCount } from "../data/reviews"

export function ProductReviews({ productId }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [expandedReview, setExpandedReview] = useState(null)
  const [sortBy, setSortBy] = useState("newest")

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

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Reviews Summary */}
      <div className="bg-dark-800 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
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

          <Button onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>
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
            >
              <div className="border-t border-dark-600 pt-6">
                <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className="focus:outline-none">
                          <Star className="w-6 h-6 text-gray-500 hover:text-yellow-500 hover:fill-yellow-500" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Review Title</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                      placeholder="Summarize your experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Review</label>
                    <textarea
                      rows={4}
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                      placeholder="Share your experience with this product"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Submit Review</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">{reviewCount} Reviews</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded-md p-1 text-sm focus:outline-none focus:ring-1 focus:ring-white"
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
            className="bg-dark-800 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={review.userImage || "/placeholder.svg"}
                    alt={review.userName}
                    className="w-full h-full object-cover"
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

            <h4 className="font-semibold mb-2">{review.title}</h4>

            <div className="text-gray-300 mb-4">
              {expandedReview === review.id || review.comment.length <= 200 ? (
                review.comment
              ) : (
                <>
                  {review.comment.substring(0, 200)}...
                  <button className="text-white underline ml-1" onClick={() => setExpandedReview(review.id)}>
                    Read more
                  </button>
                </>
              )}

              {expandedReview === review.id && review.comment.length > 200 && (
                <button className="text-white underline block mt-2" onClick={() => setExpandedReview(null)}>
                  Show less
                </button>
              )}
            </div>

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
          <div className="text-center py-8 bg-dark-800 rounded-lg">
            <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
            <Button className="mt-4" onClick={() => setShowReviewForm(true)}>
              Write a Review
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
