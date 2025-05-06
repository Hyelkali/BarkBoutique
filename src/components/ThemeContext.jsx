"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme")

    // Check user's system preference if no saved theme
    if (!savedTheme) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    return savedTheme
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  // Apply theme class to document
  useEffect(() => {
    const root = window.document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
  }, [theme])

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
