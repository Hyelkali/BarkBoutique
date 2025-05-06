"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { CartIcon } from "../components/CartIcon"
import { CartSidebar } from "../components/CartSidebar"
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react"
import { getBlogPostBySlug, getRelatedBlogPosts } from "../data/blog"
import { getProductById } from "../data/products"
import { ProductCard } from "../components/HoodieCard"

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const blogPost = getBlogPostBySlug(slug)

    if (blogPost) {
      setPost(blogPost)

      // Get related posts
      const related = getRelatedBlogPosts(blogPost.category, blogPost.id)
      setRelatedPosts(related)

      // Get related products
      const products = blogPost.relatedProducts.map((productId) => getProductById(productId)).filter(Boolean)
      setRelatedProducts(products)
    }

    setLoading(false)
    window.scrollTo(0, 0)
  }, [slug])

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
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
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate("/blog")}>
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Button>
      </div>

      {/* Article Header */}
      <section className="bg-dark-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-dark-600 px-3 py-1 rounded-full text-sm">{post.category}</span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.publishDate)}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={post.authorImage || "/placeholder.svg"}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-gray-400">{post.authorBio}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-dark-900">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-dark-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="prose prose-invert prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 pt-8 border-t border-dark-600">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-dark-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share This Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-dark-800 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Products Mentioned in This Article</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block">
                  <ProductCard {...product} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-dark-900 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                  <motion.article
                    className="bg-dark-800 rounded-lg overflow-hidden h-full flex flex-col"
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.featuredImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-lg font-bold mb-3">{relatedPost.title}</h3>
                      <p className="text-gray-400 mb-4">{relatedPost.excerpt}</p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
