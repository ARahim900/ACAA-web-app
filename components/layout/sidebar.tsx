"use client"

import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import { 
  Home, 
  Droplets, 
  Zap, 
  Recycle, 
  HardHat, 
  Trash2, 
  Menu, 
  ChevronRight, 
  SunMoon
} from "lucide-react"

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, currentSection, setCurrentSection, darkMode, setDarkMode } = useAppContext()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Function to handle navigation item click
  const handleNavClick = (section: string) => {
    setCurrentSection(section)
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 
      ${sidebarOpen ? "w-64" : "w-20"} 
      bg-sidebar text-sidebar-foreground shadow-md
      dark:bg-sidebar dark:text-sidebar-foreground`}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        {/* Sidebar header */}
        <div className="relative flex h-16 items-center justify-between px-4">
          {sidebarOpen && (
            <div className="text-2xl font-semibold text-sidebar-primary">
              Muscat Bay
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-2 text-sidebar-foreground hover:text-sidebar-primary ${
              sidebarOpen ? "absolute right-4" : "mx-auto"
            }`}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {/* Dashboard */}
          <NavItem
            icon={<Home size={24} />}
            label="Dashboard"
            section="dashboard"
            currentSection={currentSection}
            sidebarOpen={sidebarOpen}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onClick={() => handleNavClick("dashboard")}
          />

          {/* Water Management */}
          <NavItem
            icon={<Droplets size={24} />}
            label="Water"
            section="water"
            currentSection={currentSection}
            sidebarOpen={sidebarOpen}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onClick={() => handleNavClick("water")}
          />

          {/* Electricity Management */}
          <NavItem
            icon={<Zap size={24} />}
            label="Electricity"
            section="electricity"
            currentSection={currentSection}
            sidebarOpen={sidebarOpen}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onClick={() => handleNavClick("electricity")}
          />

          {/* STP Plant */}
          <NavItem
            icon={<Recycle size={24} />}
            label="STP Plant"
            section="stp-plant"
            currentSection={currentSection}
            sidebarOpen={sidebarOpen}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onClick={() => handleNavClick("stp-plant")}
          />

          {/* Waste Management */}
          <NavItem
            icon={<Trash2 size={24} />}
            label="Waste"
            section="waste-management"
            currentSection={currentSection}
            sidebarOpen={sidebarOpen}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onClick={() => handleNavClick("waste-management")}
          />

          {/* Contractors */}
          <NavItem
            icon={<HardHat size={24} />}
            label="Contractors"
            section="contractors"
            currentSection={currentSection}
            sidebarOpen={sidebarOpen}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            onClick={() => handleNavClick("contractors")}
          />
        </nav>

        {/* Footer */}
        <div className="mt-auto pb-4 px-3">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center w-full p-2 rounded-md transition-colors
            ${sidebarOpen ? "justify-start" : "justify-center"}
            ${darkMode ? "text-yellow-400" : "text-sidebar-foreground"}
            hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
          >
            <SunMoon size={24} />
            {sidebarOpen && (
              <span className="ml-3 text-sm font-medium">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// NavItem component
function NavItem({
  icon,
  label,
  section,
  currentSection,
  sidebarOpen,
  hoveredItem,
  setHoveredItem,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  section: string
  currentSection: string
  sidebarOpen: boolean
  hoveredItem: string | null
  setHoveredItem: (item: string | null) => void
  onClick: () => void
}) {
  const isActive = currentSection === section
  const isHovered = hoveredItem === section

  return (
    <Link
      href={`/${section === "dashboard" ? "" : section}`}
      className={`group relative flex items-center p-2 text-sm rounded-md transition-colors 
      ${
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      } 
      ${sidebarOpen ? "justify-start" : "justify-center"}`}
      onMouseEnter={() => setHoveredItem(section)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={onClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      {sidebarOpen ? (
        <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
      ) : isHovered && !isActive ? (
        <div className="absolute left-full top-0 ml-6 min-w-max rounded-md bg-sidebar-accent px-2 py-1 text-sm text-sidebar-accent-foreground shadow-md">
          <div className="absolute -left-1 top-[50%] h-2 w-2 -translate-y-1/2 rotate-45 bg-sidebar-accent"></div>
          {label}
        </div>
      ) : null}
      {isActive && !sidebarOpen && (
        <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-sidebar-primary-foreground" />
      )}
      {sidebarOpen && isActive && (
        <ChevronRight size={16} className="ml-auto flex-shrink-0" />
      )}
    </Link>
  )
}