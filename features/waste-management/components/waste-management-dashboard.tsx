"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Trash2 } from "lucide-react"

export default function WasteManagementDashboard() {
  const { setCurrentSection } = useAppContext()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set current section for sidebar navigation
    setCurrentSection("waste-management")

    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateWasteData())
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
        <h1 className="text-3xl font-bold">Waste Management</h1>
        <p className="text-muted-foreground">Waste collection and recycling monitoring</p>
      </header>

      {/* Summary Card */}
      <div className="bg-card p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Waste Collected</h2>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">12.8</span>
              <span className="ml-1 text-sm text-muted-foreground">tons</span>
            </div>
            <p className="mt-1 text-sm text-red-500">-3.1% vs last month</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full">
            <Trash2 className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Waste Collection Chart */}
      <div className="bg-card p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Waste Collection</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="total"
                name="Total Waste (tons)"
                stroke="var(--chart-5)"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="recycled"
                name="Recycled (%)"
                stroke="var(--chart-3)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Generate sample waste data
function generateWasteData() {
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
    const baseTotal = 10 + Math.random() * 8
    const baseRecycled = 40 + Math.random() * 30
    const seasonalFactor = Math.sin((index / 11) * Math.PI * 2) // Full sine wave across the year
    
    return {
      month,
      total: Math.round((baseTotal + seasonalFactor * 2) * 10) / 10, // More waste in summer
      recycled: Math.round(baseRecycled - Math.abs(seasonalFactor) * 10), // Lower recycling at peak seasons
    }
  })
}