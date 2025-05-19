"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { HardHat } from "lucide-react"

export default function ContractorDashboard() {
  const { setCurrentSection } = useAppContext()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set current section for sidebar navigation
    setCurrentSection("contractors")

    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateContractorData())
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [setCurrentSection])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Contractor Management</h1>
        <p className="text-muted-foreground">Track and manage contractor projects and performance</p>
      </header>

      {/* Summary Card */}
      <div className="bg-card p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Active Jobs</h2>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">34</span>
              <span className="ml-1 text-sm text-muted-foreground">active</span>
            </div>
            <p className="mt-1 text-sm text-green-500">+12.5% vs last month</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full">
            <HardHat className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Contractors Chart */}
      <div className="bg-card p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Contractor Jobs by Category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="active" 
                name="Active Jobs" 
                fill="var(--chart-4)" 
              />
              <Bar 
                dataKey="completed" 
                name="Completed Jobs" 
                fill="var(--chart-5)" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Generate sample contractor data
function generateContractorData() {
  const categories = [
    "Plumbing",
    "Electrical",
    "Landscaping",
    "Construction",
    "Cleaning",
    "Security"
  ]

  return categories.map((category) => {
    // Generate some realistic but random data
    return {
      category,
      active: Math.floor(Math.random() * 10) + 1,
      completed: Math.floor(Math.random() * 20) + 10,
    }
  })
}