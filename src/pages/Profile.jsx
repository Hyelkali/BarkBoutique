"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../components/AuthContext"
import { useToast } from "../components/ToastContext"
import { FileUpload } from "../components/FileUpload"
import {
  User,
  MapPin,
  Shield,
  Package,
  Heart,
  CreditCard,
  Edit,
  Save,
  X,
  Camera,
  Mail,
  Phone,
  Calendar,
  Home,
} from "lucide-react"

const Profile = () => {
  const { currentUser, updateUserProfile, loading } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    birthday: "",
  })

  useEffect(() => {
    if (currentUser) {
      // Get user data from Firebase or use defaults
      setFormData({
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
        phone: currentUser.phoneNumber || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        state: currentUser.state || "",
        zip: currentUser.zip || "",
        country: currentUser.country || "",
        birthday: currentUser.birthday || "",
      })
    }
  }, [currentUser])

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login", { state: { from: "/profile" } })
    }
  }, [currentUser, loading, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhotoUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      photoURL: url,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      // Update profile in Firebase
      await updateUserProfile({
        displayName: formData.displayName,
        photoURL: formData.photoURL,
        // Additional user data would be stored in Firestore in a real app
      })

      setSuccess("Profile updated successfully!")
      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (err) {
      setError(err.message || "Failed to update profile")
      toast.error(err.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container min-h-screen px-4 py-8 mx-auto bg-gradient-to-b from-indigo-50/50 to-purple-50/50 dark:from-dark-900 dark:to-indigo-950/30"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>

        {error && (
          <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded-md dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-6 text-green-700 bg-green-100 border border-green-400 rounded-md dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
            {success}
          </div>
        )}

        <div className="overflow-hidden rounded-lg shadow-xl bg-white/80 backdrop-blur-sm dark:bg-dark-800/90">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-6 pb-6 -mb-16 md:flex-row md:items-end">
              <div className="relative w-32 h-32 mb-4 overflow-hidden bg-white rounded-full ring-4 ring-white dark:ring-dark-800 md:mb-0 md:mr-4">
                <img
                  src={
                    formData.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.displayName || currentUser.email)}&background=random&size=128`
                  }
                  alt={formData.displayName || "User"}
                  className="object-cover w-full h-full"
                />

                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <FileUpload
                      onUploadComplete={handlePhotoUpload}
                      folder="avatars"
                      accept="image/*"
                      maxSizeMB={2}
                      buttonText=""
                      className="w-full h-full"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full text-white">
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-xs">Change</span>
                      </div>
                    </FileUpload>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {currentUser.displayName || currentUser.email?.split("@")[0] || "User"}
                </h2>
                <p className="text-white text-opacity-90">{currentUser.email}</p>
              </div>

              <div className="mt-4 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-6">
            <div className="px-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Personal Information */}
                  <div className="col-span-2">
                    <h3 className="flex items-center mb-4 text-lg font-semibold">
                      <User className="w-5 h-5 mr-2 text-indigo-500" />
                      Personal Information
                    </h3>

                    <div className="p-4 border rounded-md bg-indigo-50/50 dark:bg-indigo-900/20 dark:border-dark-600">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <User className="w-4 h-4 mr-1 text-gray-400" />
                            Full Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="displayName"
                              value={formData.displayName}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.displayName || "Not set"}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <Mail className="w-4 h-4 mr-1 text-gray-400" />
                            Email Address
                          </label>
                          <p className="px-3 py-2 border border-transparent">{currentUser.email}</p>
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <Phone className="w-4 h-4 mr-1 text-gray-400" />
                            Phone Number
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.phone || "Not set"}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            Birthday
                          </label>
                          {isEditing ? (
                            <input
                              type="date"
                              name="birthday"
                              value={formData.birthday}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.birthday || "Not set"}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="col-span-2">
                    <h3 className="flex items-center mb-4 text-lg font-semibold">
                      <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                      Address Information
                    </h3>

                    <div className="p-4 border rounded-md bg-purple-50/50 dark:bg-purple-900/20 dark:border-dark-600">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <Home className="w-4 h-4 mr-1 text-gray-400" />
                            Street Address
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.address || "Not set"}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            City
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.city || "Not set"}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            State/Province
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.state || "Not set"}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            ZIP/Postal Code
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.zip || "Not set"}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center mb-1 text-sm font-medium">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            Country
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border rounded-md dark:bg-dark-700 dark:border-dark-600"
                            />
                          ) : (
                            <p className="px-3 py-2 border border-transparent">{formData.country || "Not set"}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="col-span-2">
                    <h3 className="flex items-center mb-4 text-lg font-semibold">
                      <Shield className="w-5 h-5 mr-2 text-indigo-500" />
                      Account Management
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div
                        className="flex flex-col p-4 transition-colors border rounded-md cursor-pointer bg-gradient-to-br from-white to-indigo-50 hover:from-indigo-50 hover:to-indigo-100 dark:from-dark-800 dark:to-indigo-900/20 dark:hover:from-dark-700 dark:hover:to-indigo-900/30 dark:border-dark-600"
                        onClick={() => navigate("/orders")}
                      >
                        <Package className="w-6 h-6 mb-2 text-indigo-500" />
                        <h4 className="font-medium">Your Orders</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Track, return, or buy things again</p>
                      </div>

                      <div
                        className="flex flex-col p-4 transition-colors border rounded-md cursor-pointer bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 dark:from-dark-800 dark:to-purple-900/20 dark:hover:from-dark-700 dark:hover:to-purple-900/30 dark:border-dark-600"
                        onClick={() => navigate("/wishlist")}
                      >
                        <Heart className="w-6 h-6 mb-2 text-purple-500" />
                        <h4 className="font-medium">Your Wishlist</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Items you've saved for later</p>
                      </div>

                      <div
                        className="flex flex-col p-4 transition-colors border rounded-md cursor-pointer bg-gradient-to-br from-white to-pink-50 hover:from-pink-50 hover:to-pink-100 dark:from-dark-800 dark:to-pink-900/20 dark:hover:from-dark-700 dark:hover:to-pink-900/30 dark:border-dark-600"
                        onClick={() => navigate("/payment-methods")}
                      >
                        <CreditCard className="w-6 h-6 mb-2 text-pink-500" />
                        <h4 className="font-medium">Payment Methods</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment options</p>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
