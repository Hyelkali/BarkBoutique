"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeContext"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    // Check if we're on mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    // Only set up cursor events if not on mobile
    if (!isMobile) {
      const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY })
      }

      const handleClick = () => {
        setClicked(true)
        setTimeout(() => setClicked(false), 300)
      }

      const handleMouseLeave = () => {
        setHidden(true)
      }

      const handleMouseEnter = () => {
        setHidden(false)
      }

      // Check if hovering over clickable elements
      const handleElementHover = (e) => {
        const isClickable =
          e.target.tagName === "A" ||
          e.target.tagName === "BUTTON" ||
          e.target.closest("a") ||
          e.target.closest("button") ||
          e.target.classList.contains("cursor-pointer") ||
          window.getComputedStyle(e.target).cursor === "pointer"

        setIsHovering(isClickable)
      }

      window.addEventListener("mousemove", updatePosition)
      window.addEventListener("mousemove", handleElementHover)
      window.addEventListener("click", handleClick)
      document.body.addEventListener("mouseleave", handleMouseLeave)
      document.body.addEventListener("mouseenter", handleMouseEnter)

      return () => {
        window.removeEventListener("mousemove", updatePosition)
        window.removeEventListener("mousemove", handleElementHover)
        window.removeEventListener("click", handleClick)
        document.body.removeEventListener("mouseleave", handleMouseLeave)
        document.body.removeEventListener("mouseenter", handleMouseEnter)
      }
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [isMobile])

  // Don't render cursor on mobile devices
  if (isMobile) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: clicked ? 1.5 : isHovering ? 1.5 : 1,
          opacity: hidden ? 0 : isHovering ? 0.7 : 1,
          backgroundColor: isHovering ? (isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)") : "transparent",
          borderColor: isDark ? "#ffffff" : "#000000",
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 400,
        }}
      />

      {/* Trailing cursor effect */}
      <motion.div
        className="custom-cursor-trail"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          opacity: hidden ? 0 : isHovering ? 0.4 : 0.6,
          backgroundColor: isDark ? "#ffffff" : "#000000",
        }}
        transition={{
          type: "spring",
          damping: 50,
          mass: 0.2,
          stiffness: 200,
        }}
      />

      {/* Additional glow effect for hover state */}
      {isHovering && (
        <motion.div
          className="pointer-events-none fixed z-[9997] rounded-full blur-md"
          animate={{
            x: position.x - 20,
            y: position.y - 20,
            width: 40,
            height: 40,
            opacity: 0.3,
            backgroundColor: isDark ? "#ffffff" : "#000000",
          }}
          transition={{
            type: "spring",
            damping: 40,
            mass: 0.3,
            stiffness: 300,
          }}
        />
      )}
    </>
  )
}
