"use client"

import { useAppContext } from "@/context/app-context"
import { useEffect } from "react"

export function InputDetector() {
  const { setDarkMode } = useAppContext()

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle dark mode with Ctrl+D
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault()
        setDarkMode((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [setDarkMode])

  // Check for system preferences
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setDarkMode(darkModeQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    darkModeQuery.addEventListener("change", handleChange)
    return () => darkModeQuery.removeEventListener("change", handleChange)
  }, [setDarkMode])

  return null
}