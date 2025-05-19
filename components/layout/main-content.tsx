"use client"

import { ReactNode, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import Sidebar from "@/components/layout/sidebar"

export function MainContent({ children }: { children: ReactNode }) {
  const { sidebarOpen, darkMode } = useAppContext()

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  )
}