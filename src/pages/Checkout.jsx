"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../components/CartContext"
import { useOrders } from "../components/OrderContext"
import { useToast } from "../components/ToastContext"
import { Button } from "../components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, totalPrice, removeFromCart, clearCart } = useCart()
  const { addOrder } = useOrders()
  const toast = useToast()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment info (demo only)
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  })
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmitShipping = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleSubmitPayment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate payment info (simple validation for demo)
      if (formData.cardNumber.length < 16) {
        throw new Error("Please enter a valid card number")
      }

      if (!formData.expDate.match(/^\d{2}\/\d{2}$/)) {
        throw new Error("Please enter a valid expiration date (MM/YY)")
      }

      if (formData.cvv.length < 3) {
        throw new Error("Please enter a valid CVV")
      }

      // Create order object
      const orderData = {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image1,
          selectedSize: item.selectedSize,
        })),
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        payment: {
          method: "credit_card",
          last4: formData.cardNumber.slice(-4),
        },
        subtotal: totalPrice,
        tax: totalPrice * 0.08,
        shipping_cost: 0,
        total: totalPrice + totalPrice * 0.08,
      }

      // Add order to database
      const newOrder = await addOrder(orderData)
      setOrderId(newOrder.id)

      // Clear cart
      clearCart()

      // Show order confirmation
      setOrderComplete(true)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("Error creating order:", error)
      setError(error.message || "Failed to place order. Please try again.")
      toast.error(error.message || "Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToHome = () => {
    navigate("/")
  }

  const viewOrder = () => {
    navigate(`/order/${orderId}`)
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some products to your cart before checking out.</p>
        <Button onClick={goToHome}>Continue Shopping</Button>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-dark-800 p-8 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Complete!</h1>
          <p className="text-gray-400 mb-4">Thank you for your purchase.</p>
          <div className="bg-dark-700 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-400 mb-1">Order ID:</p>
            <p className="font-mono font-bold">{orderId}</p>
          </div>
          <p className="text-gray-400 mb-6">
            We've sent a confirmation email to {formData.email}. You'll receive another email when your order ships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={viewOrder} variant="default">
              View Order
            </Button>
            <Button onClick={goToHome} variant="outline">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Checkout Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 1 ? "bg-white text-dark-900" : "bg-dark-400"}`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? "bg-white" : "bg-dark-400"}`}></div>
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 2 ? "bg-white text-dark-900" : "bg-dark-400"}`}
          >
            2
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-md flex items-start max-w-3xl mx-auto">
          <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-2">
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
              <form onSubmit={handleSubmitShipping} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Payment Information</h1>
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiration Date</label>
                    <input
                      type="text"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleInputChange}
                      required
                      placeholder="MM/YY"
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      placeholder="123"
                      className="w-full p-2 bg-dark-700 border border-dark-600 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Complete Order"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-dark-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-dark-700 rounded overflow-hidden">
                    <img
                      src={item.image1 || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-400">
                      {item.selectedSize ? `Size: ${item.selectedSize}` : ""} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-dark-600 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-dark-600">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
