"use client"

import { motion } from "framer-motion"
import { useTheme } from "./ThemeContext"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-opacity-20 backdrop-blur-sm"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{
            opacity: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? -90 : 0,
            scale: theme === "dark" ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-yellow-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 90 }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
            scale: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-blue-300" />
        </motion.div>
      </div>
    </motion.button>
  )
}
