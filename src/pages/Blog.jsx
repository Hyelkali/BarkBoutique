"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CartIcon } from "../components/CartIcon"
import { CartSidebar } from "../components/CartSidebar"
import { Button } from "../components/ui/button"
import { Search, Calendar } from "lucide-react"
import blogPosts, { getBlogCategories } from "../data/blog"

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = getBlogCategories()

  // Filter blog posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    // Search filter
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Category filter
    if (activeCategory !== "all" && post.category !== activeCategory) {
      return false
    }

    return true
  })

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

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
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Dog with a book"
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
            Dog Care Blog
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Expert advice, training tips, and product guides for dog parents
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-dark-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              size="sm"
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
            >
              All Topics
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-dark-900 py-12">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No articles match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link to={`/blog/${post.slug}`} key={post.id}>
                  <motion.article
                    className="bg-dark-800 rounded-lg overflow-hidden h-full flex flex-col"
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-dark-600 px-3 py-1 rounded-full text-xs">{post.category}</span>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(post.publishDate)}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      <p className="text-gray-400 mb-4 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center mt-auto">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{post.author}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-dark-800 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-dark-700 p-8 rounded-lg">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-300 mb-6">
                Get the latest dog care tips, product recommendations, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 bg-dark-600 border border-dark-500 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
