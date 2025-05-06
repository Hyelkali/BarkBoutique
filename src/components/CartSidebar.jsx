"use client"
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"
import { useCart } from "./CartContext"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export function CartSidebar() {
  const { isOpen, toggleCart, cart, removeFromCart, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    toggleCart() // Close the cart
    navigate("/checkout") // Navigate to checkout
  }

  // Animation variants
  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            onClick={toggleCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-dark-800 z-50 shadow-xl"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                className="flex justify-between items-center p-4 border-b border-dark-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={toggleCart} className="p-2 rounded-full hover:bg-dark-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </motion.div>

              {/* Cart Items */}
              <div className="flex-grow overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-gray-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="mb-4">Your cart is empty</p>
                    <Button variant="outline" onClick={toggleCart} className="flex items-center gap-2">
                      Continue Shopping
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <ul className="space-y-4">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.li
                          key={item.id}
                          className="flex border-b border-dark-600 pb-4"
                          variants={itemVariants}
                          layout
                          layoutId={`cart-item-${item.id}`}
                        >
                          <div className="w-20 h-20 bg-dark-700 rounded overflow-hidden mr-4 flex-shrink-0">
                            <img
                              src={item.image1 || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-400">${item.price.toFixed(2)}</p>
                            {item.selectedSize && <p className="text-xs text-gray-400">Size: {item.selectedSize}</p>}

                            <div className="flex items-center mt-2">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full hover:bg-dark-600 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full hover:bg-dark-600 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>

                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto p-1 rounded-full hover:bg-dark-600 text-red-500 transition-colors"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <motion.div
                  className="p-4 border-t border-dark-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal:</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${totalPrice.toFixed(2)}
                    </motion.span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between mb-4 text-lg font-bold">
                    <span>Total:</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${totalPrice.toFixed(2)}
                    </motion.span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Checkout
                  </Button>
                  <button
                    onClick={toggleCart}
                    className="w-full text-center mt-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
