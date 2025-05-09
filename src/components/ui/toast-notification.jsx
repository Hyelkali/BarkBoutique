"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

// Simple utility function for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// Individual Toast Notification Component
export const ToastNotification = ({ message, type = "default", duration = 5000, onClose }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        type === "success" && "border-green-500 bg-green-100 text-green-900",
        type === "error" && "border-red-500 bg-red-100 text-red-900",
        type === "info" && "border-blue-500 bg-blue-100 text-blue-900",
        type === "warning" && "border-yellow-500 bg-yellow-100 text-yellow-900",
        type === "default" && "border-gray-200 bg-white text-gray-900",
      )}
    >
      <div className="grid gap-1">
        {typeof message === "string" ? (
          <div className="text-sm">{message}</div>
        ) : (
          <>
            {message.title && <div className="text-sm font-semibold">{message.title}</div>}
            {message.description && <div className="text-sm opacity-90">{message.description}</div>}
          </>
        )}
      </div>
      <button
        onClick={onClose}
        className="absolute p-1 text-gray-500 transition-opacity rounded-md opacity-0 right-2 top-2 hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Direct toast function for use outside of React components
export const toast = (props) => {
  // This is just a placeholder - the actual implementation is in ToastContext.jsx
  console.warn("Using toast outside of ToastContext - this won't work")
}
