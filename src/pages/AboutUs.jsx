"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container px-4 py-12 mx-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">About BarkBoutique</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Premium dog apparel for the stylish canine in your life
          </p>
        </div>

        <div className="p-8 mb-12 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Our Story</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                BarkBoutique was founded in 2020 by a group of passionate dog lovers who believed that our furry friends
                deserve to look as stylish as their owners. What started as a small home-based business has grown into a
                beloved brand trusted by dog owners worldwide.
              </p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Our journey began when our founder's dog, Max, refused to wear the uncomfortable, poorly designed
                sweaters available on the market. This inspired us to create dog apparel that was not only fashionable
                but also comfortable and practical.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to innovate and expand our collection, always keeping the comfort and happiness of
                dogs at the forefront of our designs.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="BarkBoutique founders with their dogs"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 mb-12 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-white">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 text-center rounded-lg bg-gray-50 dark:bg-dark-700">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <svg
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We use only the finest materials and craftsmanship to ensure our products are durable and comfortable.
              </p>
            </div>
            <div className="p-6 text-center rounded-lg bg-gray-50 dark:bg-dark-700">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <svg
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to eco-friendly practices and reducing our environmental pawprint.
              </p>
            </div>
            <div className="p-6 text-center rounded-lg bg-gray-50 dark:bg-dark-700">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <svg
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We support animal shelters and rescue organizations with a portion of our profits.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 mb-12 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-white">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { name: "Emma Johnson", role: "Founder & CEO", image: "/placeholder.svg?height=200&width=200" },
              { name: "David Chen", role: "Head of Design", image: "/placeholder.svg?height=200&width=200" },
              { name: "Sarah Williams", role: "Marketing Director", image: "/placeholder.svg?height=200&width=200" },
              { name: "Michael Brown", role: "Customer Experience", image: "/placeholder.svg?height=200&width=200" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-full aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="mb-1 text-lg font-medium text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 text-center rounded-lg bg-primary-50 dark:bg-primary-900/10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Join the BarkBoutique Family</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            We're more than just a dog apparel store - we're a community of dog lovers who believe that our furry
            friends deserve the best.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 font-medium transition-colors border rounded-md text-primary-600 border-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUs
