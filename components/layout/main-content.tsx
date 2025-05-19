"use client"

import { ReactNode, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import Sidebar from "@/components/layout/sidebar"

export function MainContent({ children }: { children: ReactNode }) {
  const { sidebarOpen, darkMode } = useAppContext()

  // Apply dark mode class to html element
  useEffect(() => {
    document.documentElement.classList.remove("dark")
  }, [])

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="h-full">{children}</div>
      </main>
    </div>
  )
}