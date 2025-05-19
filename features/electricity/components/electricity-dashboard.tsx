"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Zap } from "lucide-react"

export default function ElectricityDashboard() {
  const { setCurrentSection } = useAppContext()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set current section for sidebar navigation
    setCurrentSection("electricity")

    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateElectricityData())
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
        <h1 className="text-3xl font-bold">Electricity Management</h1>
        <p className="text-muted-foreground">Electricity usage and distribution monitoring</p>
      </header>

      {/* Summary Card */}
      <div className="bg-card p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Current Consumption</h2>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">324,690</span>
              <span className="ml-1 text-sm text-muted-foreground">kWh</span>
            </div>
            <p className="mt-1 text-sm text-red-500">-2.7% vs last month</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
            <Zap className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Electricity Usage Chart */}
      <div className="bg-card p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Electricity Consumption</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="consumption"
                name="Electricity (kWh)"
                stroke="var(--chart-2)"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Generate sample electricity data
function generateElectricityData() {
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
    const baseConsumption = 300000 + Math.random() * 50000
    const seasonalFactor = Math.sin((index / 11) * Math.PI * 2) // Full sine wave across the year
    
    return {
      month,
      consumption: Math.round(baseConsumption + seasonalFactor * 25000), // More electricity in summer
    }
  })
}