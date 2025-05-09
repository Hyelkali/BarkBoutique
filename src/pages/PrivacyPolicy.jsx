"use client"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container px-4 py-12 mx-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Last Updated: May 9, 2023</p>
        </div>

        <div className="p-8 mb-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300">
                At BarkBoutique, we respect your privacy and are committed to protecting your personal data. This
                privacy policy explains how we collect, use, and safeguard your information when you visit our website
                or make a purchase.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Information We Collect</h3>
              <p className="mb-2 text-gray-600 dark:text-gray-300">
                We may collect the following types of information:
              </p>
              <ul className="pl-5 space-y-1 text-gray-600 list-disc dark:text-gray-300">
                <li>Personal information (name, email address, phone number, shipping address)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Account information (username, password)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Cookies and usage data</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">How We Use Your Information</h3>
              <p className="mb-2 text-gray-600 dark:text-gray-300">
                We use your information for the following purposes:
              </p>
              <ul className="pl-5 space-y-1 text-gray-600 list-disc dark:text-gray-300">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your orders and account</li>
                <li>To provide customer support</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To detect and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-800 dark:text-white">Data Sharing and Disclosure</h3>
              <p className="mb-2 text-gray-600 dark:text-gray-300">We may share your information with:</p>
              <ul className="pl-5 space-y-1 text-gray-600 list-disc dark:text-gray-300">
                <li>Service providers (payment processors, shipping companies)</li>
                <li>Business partners (with your consent)</li>
                <li>Legal authorities when required by law</li>
                <li>Successor entities in the event of a business sale or merger</li>
              </ul>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We do not sell your personal information to third parties.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 mb-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Lock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We implement appropriate security measures to protect your personal information.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              We take the security of your data seriously and use industry-standard security measures to protect your
              personal information from unauthorized access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="pl-5 space-y-1 list-disc">
              <li>Encryption of sensitive data</li>
              <li>Secure socket layer (SSL) technology</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage</li>
            </ul>
            <p>
              While we strive to protect your personal information, no method of transmission over the Internet or
              electronic storage is 100% secure. We cannot guarantee absolute security but continuously work to improve
              our security practices.
            </p>
          </div>
        </div>

        <div className="p-8 mb-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Eye className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Cookies and Tracking</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Information about how we use cookies and similar technologies.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze
              site traffic, and personalize content. Cookies are small text files stored on your device that help us
              recognize you and remember your preferences.
            </p>
            <p>We use the following types of cookies:</p>
            <ul className="pl-5 space-y-1 list-disc">
              <li>
                <strong>Essential cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Functional cookies:</strong> Remember your preferences and settings
              </li>
              <li>
                <strong>Analytical cookies:</strong> Help us understand how visitors interact with our website
              </li>
              <li>
                <strong>Marketing cookies:</strong> Track your browsing habits to deliver targeted advertising
              </li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings. Please note that disabling certain
              cookies may affect the functionality of our website.
            </p>
          </div>
        </div>

        <div className="p-8 mb-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300">Understanding your data protection rights.</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="pl-5 space-y-1 list-disc">
              <li>
                <strong>Right to access:</strong> You can request a copy of the personal information we hold about you.
              </li>
              <li>
                <strong>Right to rectification:</strong> You can request that we correct inaccurate or incomplete
                information.
              </li>
              <li>
                <strong>Right to erasure:</strong> You can request that we delete your personal information in certain
                circumstances.
              </li>
              <li>
                <strong>Right to restrict processing:</strong> You can request that we limit how we use your data.
              </li>
              <li>
                <strong>Right to data portability:</strong> You can request a copy of your data in a machine-readable
                format.
              </li>
              <li>
                <strong>Right to object:</strong> You can object to our processing of your personal information.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at privacy@barkboutique.com. We will respond to your
              request within 30 days.
            </p>
          </div>
        </div>

        <div className="p-8 mb-8 bg-white rounded-lg shadow-md dark:bg-dark-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <AlertCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">How we update our privacy practices.</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or for legal,
              operational, or regulatory reasons. We will notify you of any material changes by posting the updated
              policy on our website with a new "Last Updated" date.
            </p>
            <p>
              We encourage you to review this policy periodically to stay informed about how we protect your
              information.
            </p>
          </div>
        </div>

        <div className="p-8 mt-12 text-center rounded-lg bg-primary-50 dark:bg-primary-900/10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Contact Us</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            If you have any questions about this privacy policy or our data practices, please contact us:
          </p>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-700 dark:text-gray-300">Email: privacy@barkboutique.com</p>
            <p className="text-gray-700 dark:text-gray-300">Phone: (800) BARK-BOUTIQUE</p>
            <p className="text-gray-700 dark:text-gray-300">Address: 123 Dogwood Lane, Pawsville, CA 94123</p>
          </div>
          <div className="mt-6">
            <Link
              to="/contact"
              className="px-6 py-3 font-medium text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PrivacyPolicy
