"use client"

import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import { 
  Home, 
  Droplets, 
  Zap, 
  Building2, 
  Users, 
  ChevronLeft
} from "lucide-react"

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, currentSection, setCurrentSection, darkMode, setDarkMode } = useAppContext()

  // Function to handle navigation item click
  const handleNavClick = (section: string) => {
    setCurrentSection(section)
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 
      ${sidebarOpen ? "w-64" : "w-20"} 
      bg-[#4f4359] text-white shadow-md`}
    >
      {/* App Logo */}
      <div className="flex items-center h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white flex items-center justify-center">
            <span className="text-[#4f4359] font-bold text-xs">MB</span>
          </div>
          {sidebarOpen && <span className="font-semibold text-lg">Muscat Bay</span>}
        </div>
        {sidebarOpen && (
          <button onClick={toggleSidebar} className="ml-auto">
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          <NavItem
            icon={<Home size={20} />}
            label="Dashboard"
            href="/"
            isActive={currentSection === "dashboard"}
            sidebarOpen={sidebarOpen}
            onClick={() => handleNavClick("dashboard")}
          />
          <NavItem
            icon={<Droplets size={20} />}
            label="Water Analysis"
            href="/water"
            isActive={currentSection === "water"}
            sidebarOpen={sidebarOpen}
            onClick={() => handleNavClick("water")}
          />
          <NavItem
            icon={<Zap size={20} />}
            label="Electricity Analysis"
            href="/electricity"
            isActive={currentSection === "electricity"}
            sidebarOpen={sidebarOpen}
            onClick={() => handleNavClick("electricity")}
          />
          <NavItem
            icon={<Building2 size={20} />}
            label="STP Plant"
            href="/stp-plant"
            isActive={currentSection === "stp-plant"}
            sidebarOpen={sidebarOpen}
            onClick={() => handleNavClick("stp-plant")}
          />
          <NavItem
            icon={<Users size={20} />}
            label="Contractor Tracker"
            href="/contractors"
            isActive={currentSection === "contractors"}
            sidebarOpen={sidebarOpen}
            onClick={() => handleNavClick("contractors")}
          />
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
            AU
          </div>
          {sidebarOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-300">admin@muscatbay.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NavItem({
  icon,
  label,
  href,
  isActive,
  sidebarOpen,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  href: string
  isActive: boolean
  sidebarOpen: boolean
  onClick: () => void
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
          isActive ? "bg-white/10 font-medium" : "hover:bg-white/5"
        }`}
        onClick={onClick}
      >
        <span className="flex-shrink-0">{icon}</span>
        {sidebarOpen && <span>{label}</span>}
      </Link>
    </li>
  )
}