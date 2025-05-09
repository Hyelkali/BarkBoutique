"use client"

import { useState, useRef } from "react"
import { uploadToBlob } from "../lib/blob"
import { Upload, X, Check, AlertCircle, Loader2 } from "lucide-react"

export function FileUpload({
  onUploadComplete,
  folder = "general",
  accept = "image/*",
  maxSizeMB = 5,
  className = "",
  buttonText = "Upload File",
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }

    setError(null)
    setIsUploading(true)
    setProgress(10) // Initial progress

    try {
      // Simulate progress (actual progress would require custom implementation)
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 300)

      // Upload file
      const url = await uploadToBlob(file, folder)

      clearInterval(progressInterval)
      setProgress(100)
      setIsUploading(false)

      // Call the callback with the URL
      if (onUploadComplete) {
        onUploadComplete(url)
      }
    } catch (err) {
      setError(err.message || "Upload failed")
      setIsUploading(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    setPreview(null)
    setError(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Preview area */}
      {preview && (
        <div className="relative w-full h-40 mb-3 overflow-hidden rounded-md bg-dark-800">
          <img src={preview || "/placeholder.svg"} alt="Upload preview" className="object-contain w-full h-full" />
          <button
            onClick={handleReset}
            className="absolute p-1 rounded-full top-2 right-2 bg-dark-900/80 hover:bg-dark-900"
            aria-label="Remove preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload button and progress */}
      <div className="flex flex-col space-y-2">
        {!isUploading && !preview ? (
          <label className="flex items-center justify-center px-4 py-2 transition-colors rounded-md cursor-pointer bg-dark-700 hover:bg-dark-600">
            <Upload className="w-4 h-4 mr-2" />
            <span>{buttonText}</span>
            <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          </label>
        ) : isUploading ? (
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">{progress}% uploaded</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="w-full h-2 overflow-hidden rounded-full bg-dark-700">
              <div
                className="h-full transition-all duration-300 ease-out bg-green-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center text-green-500">
            <Check className="w-4 h-4 mr-2" />
            <span className="text-sm">Upload complete</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center text-sm text-red-500">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
