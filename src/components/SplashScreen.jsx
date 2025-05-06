"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500) // Delay before hiding splash screen
          return 100
        }
        return prev + 1
      })
    }, 20) // Faster loading for better UX

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-dark-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-48 h-48 mb-8 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white font-bold text-4xl md:text-5xl flex items-center">
              <motion.span
                className="mr-2"
                initial={{ rotate: -30, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                🐾
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                BarkBoutique
              </motion.span>
            </div>
          </motion.div>

          {/* Paw prints loading animation */}
          <div className="flex space-x-4 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [10, 0, 10] }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              >
                🐾
              </motion.div>
            ))}
          </div>

          {/* Progress bar container */}
          <div className="w-64 h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="mt-2 font-mono text-sm text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {`${progress}%`}
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="mt-8 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p>Preparing your pawsome experience...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
