"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "./ThemeContext"

export function ProductGallery({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)
  const { isDark } = useTheme()

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index)
    setIsZoomed(false)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setIsZoomed(false)
  }

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomPosition({ x, y })
  }

  const handleMouseLeave = () => {
    if (isZoomed) {
      setIsZoomed(false)
    }
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className={`relative overflow-hidden rounded-lg ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={imageRef} className="aspect-square bg-gray-100 dark:bg-dark-800 relative">
            <motion.img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${productName} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 2 : 1,
                x: isZoomed ? `${-(zoomPosition.x * 100) + 50}%` : 0,
                y: isZoomed ? `${-(zoomPosition.y * 100) + 50}%` : 0,
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.2 },
                x: { duration: 0 },
                y: { duration: 0 },
              }}
            />
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleZoom()
              }}
              className={`p-2 rounded-full ${
                isDark ? "bg-dark-900/60 hover:bg-dark-900/80" : "bg-white/60 hover:bg-white/80"
              } backdrop-blur-sm transition-colors`}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              className={`p-2 rounded-full ${
                isDark ? "bg-dark-900/60 hover:bg-dark-900/80" : "bg-white/60 hover:bg-white/80"
              } backdrop-blur-sm transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  isDark ? "bg-dark-900/60 hover:bg-dark-900/80" : "bg-white/60 hover:bg-white/80"
                } backdrop-blur-sm transition-colors`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  isDark ? "bg-dark-900/60 hover:bg-dark-900/80" : "bg-white/60 hover:bg-white/80"
                } backdrop-blur-sm transition-colors`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
                  currentIndex === index
                    ? isDark
                      ? "ring-2 ring-white"
                      : "ring-2 ring-dark-900"
                    : "opacity-70 hover:opacity-100"
                } transition-opacity`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={toggleFullscreen}
          >
            <div className="relative w-full max-w-4xl p-4">
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative">
                <img
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={`${productName} - Image ${currentIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Fullscreen Thumbnails */}
              {images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleThumbnailClick(index)
                      }}
                      className={`relative w-16 h-16 rounded-md overflow-hidden ${
                        currentIndex === index ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
                      } transition-opacity`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${productName} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
