"use client"

import { useState } from "react"
import { useAuth } from "./AuthContext"
import { FileUpload } from "./FileUpload"
import { User } from "lucide-react"

export function UserProfile() {
  const { user, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState(null)

  const handleAvatarUpload = (url) => {
    setPhotoURL(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    setError(null)

    try {
      await updateUserProfile({
        displayName,
        photoURL,
      })
      setIsEditing(false)
    } catch (err) {
      setError(err.message || "Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="p-6 rounded-lg shadow-lg bg-dark-800">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="relative">
          <div className="flex items-center justify-center w-24 h-24 overflow-hidden rounded-full bg-dark-700">
            {photoURL ? (
              <img
                src={photoURL || "/placeholder.svg"}
                alt={displayName || "User avatar"}
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>

          {isEditing && (
            <div className="mt-2">
              <FileUpload
                onUploadComplete={handleAvatarUpload}
                folder="avatars"
                accept="image/png, image/jpeg, image/webp"
                maxSizeMB={2}
                buttonText="Change Avatar"
              />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block mb-1 text-sm font-medium">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-dark-700 border-dark-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <div className="px-3 py-2 text-gray-400 border rounded-md bg-dark-700 border-dark-600">
                  {user?.email}
                </div>
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <div className="flex justify-end pt-2 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-md border-dark-600 hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">{user?.displayName || "User"}</h2>
              <p className="text-gray-400">{user?.email}</p>

              <div className="mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-md bg-dark-700 hover:bg-dark-600"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
