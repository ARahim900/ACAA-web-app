"use client"

import { createContext, useState, useContext, ReactNode } from "react"

// Define the context type
interface AppContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  currentSection: string
  setCurrentSection: (section: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  sidebarOpen: true,
  setSidebarOpen: () => {},
  currentSection: "dashboard",
  setCurrentSection: () => {},
  darkMode: false,
  setDarkMode: () => {},
})

// Create a provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSection, setCurrentSection] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        currentSection,
        setCurrentSection,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Create a hook to use the context
export function useAppContext() {
  return useContext(AppContext)
}