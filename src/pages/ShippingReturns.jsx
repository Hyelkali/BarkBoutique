"use client"
import { motion } from "framer-motion"
import { Truck, Package, RefreshCw, Clock, ShieldCheck, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"

const ShippingReturns = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container px-4 py-12 mx-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Shipping & Returns</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about our shipping policies and return process
          </p>
        </div>

        <div className="mb-12">
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Shipping Policy</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Processing Time</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving
                  your order confirmation email. You will receive another notification when your order has shipped.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Shipping Options</h3>
                <div className="overflow-x-auto">
                  <table className="w-full mt-2 border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-dark-700">
                        <th className="p-3 text-left border dark:border-dark-600">Shipping Method</th>
                        <th className="p-3 text-left border dark:border-dark-600">Estimated Delivery Time</th>
                        <th className="p-3 text-left border dark:border-dark-600">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-dark-600">
                        <td className="p-3 border-r dark:border-dark-600">Standard Shipping</td>
                        <td className="p-3 border-r dark:border-dark-600">5-7 business days</td>
                        <td className="p-3">$5.99</td>
                      </tr>
                      <tr className="border-b dark:border-dark-600">
                        <td className="p-3 border-r dark:border-dark-600">Express Shipping</td>
                        <td className="p-3 border-r dark:border-dark-600">2-3 business days</td>
                        <td className="p-3">$12.99</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-r dark:border-dark-600">Next Day Delivery</td>
                        <td className="p-3 border-r dark:border-dark-600">1 business day</td>
                        <td className="p-3">$24.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  * Free standard shipping on orders over $75
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Tracking Information</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You will receive a shipping confirmation email with a tracking number once your order has shipped. You
                  can track your package by clicking the tracking link in the email or entering the tracking number on
                  the carrier's website.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">International Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We currently ship to the United States, Canada, and select European countries. International orders
                  may be subject to import duties and taxes, which are the responsibility of the recipient. Please allow
                  7-14 business days for international deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <RefreshCw className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Returns & Exchanges</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Return Policy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We want you and your furry friend to be completely satisfied with your purchase. If you're not
                  satisfied for any reason, we accept returns within 30 days of delivery for a full refund or exchange.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Return Process</h3>
                <ol className="pl-5 mt-2 space-y-2 text-gray-600 list-decimal dark:text-gray-300">
                  <li>Contact our customer service team at returns@barkboutique.com to initiate a return.</li>
                  <li>You'll receive a return authorization number and instructions.</li>
                  <li>Pack the item(s) securely in the original packaging if possible.</li>
                  <li>Include the return authorization number on the outside of the package.</li>
                  <li>Ship the package to the address provided in the return instructions.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Return Conditions</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">To be eligible for a return, your item must be:</p>
                <ul className="pl-5 space-y-1 text-gray-600 list-disc dark:text-gray-300">
                  <li>Unused and in the same condition that you received it</li>
                  <li>In the original packaging</li>
                  <li>Accompanied by the receipt or proof of purchase</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Non-Returnable Items</h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">The following items cannot be returned:</p>
                <ul className="pl-5 space-y-1 text-gray-600 list-disc dark:text-gray-300">
                  <li>Custom-made or personalized items</li>
                  <li>Sale items (unless defective)</li>
                  <li>Items marked as final sale</li>
                  <li>Gift cards</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Exchanges</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  If you need to exchange an item for a different size or color, please follow the same process as
                  returns. Once we receive the returned item, we'll process your exchange and ship the new item to you.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Refunds</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once we receive and inspect your return, we'll send you an email to notify you that we've received
                  your returned item. We'll also notify you of the approval or rejection of your refund. If approved,
                  your refund will be processed, and a credit will automatically be applied to your original method of
                  payment within 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-3">
          <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-dark-800">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">30-Day Returns</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Return any item within 30 days of delivery for a full refund.
            </p>
          </div>

          <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-dark-800">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <ShieldCheck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Quality Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300">All our products are backed by our quality guarantee.</p>
          </div>

          <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-dark-800">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Package className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Free Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">Free standard shipping on all orders over $75.</p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <HelpCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                How long will it take to receive my order?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Orders are typically processed within 1-2 business days. Shipping times vary depending on the shipping
                method selected at checkout. Standard shipping usually takes 5-7 business days, while express shipping
                takes 2-3 business days.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                Can I change or cancel my order?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can change or cancel your order within 2 hours of placing it. Please contact our customer service
                team immediately at orders@barkboutique.com with your order number.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Do you ship internationally?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we ship to the United States, Canada, and select European countries. International shipping rates
                and delivery times vary by location.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                What if my item arrives damaged?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If your item arrives damaged, please contact us within 48 hours of delivery with photos of the damaged
                item and packaging. We'll arrange for a replacement to be sent to you as soon as possible.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 mt-12 text-center rounded-lg bg-primary-50 dark:bg-primary-900/10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Need More Help?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Our customer service team is here to assist you with any questions or concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
            >
              Contact Us
            </Link>
            <a
              href="mailto:support@barkboutique.com"
              className="px-6 py-3 font-medium transition-colors border rounded-md text-primary-600 border-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/20"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ShippingReturns
