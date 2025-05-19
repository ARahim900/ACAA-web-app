"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Recycle } from "lucide-react"

export default function StpPlantDashboard() {
  const { setCurrentSection } = useAppContext()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set current section for sidebar navigation
    setCurrentSection("stp-plant")

    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateStpData())
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
        <h1 className="text-3xl font-bold">STP Plant Management</h1>
        <p className="text-muted-foreground">Sewage Treatment Plant operations monitoring</p>
      </header>

      {/* Summary Card */}
      <div className="bg-card p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Current Throughput</h2>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">4,120</span>
              <span className="ml-1 text-sm text-muted-foreground">m³</span>
            </div>
            <p className="mt-1 text-sm text-green-500">+1.5% vs last month</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
            <Recycle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* STP Plant Chart */}
      <div className="bg-card p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">STP Plant Efficiency</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="efficiency" 
                name="Efficiency (%)" 
                fill="var(--chart-3)" 
              />
              <Bar 
                dataKey="throughput" 
                name="Throughput (m³)" 
                fill="var(--chart-4)" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Generate sample STP plant data
function generateStpData() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  return months.map((month, index) => {
    // Generate some realistic but random data
    const baseEfficiency = 75 + Math.random() * 20
    const baseThroughput = 3500 + Math.random() * 1000
    const seasonalFactor = Math.sin((index / 11) * Math.PI * 2) // Full sine wave across the year
    
    return {
      month,
      efficiency: Math.round(baseEfficiency - Math.abs(seasonalFactor) * 5), // Lower efficiency at peak seasons
      throughput: Math.round(baseThroughput + seasonalFactor * 500), // More throughput in summer
    }
  })
}