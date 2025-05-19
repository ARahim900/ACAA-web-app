"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ArrowUpRight, ArrowDownRight, Activity, Droplets, Zap, Recycle, Trash2, HardHat } from "lucide-react"

export default function MainDashboard() {
  const { setCurrentSection } = useAppContext()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set current section for sidebar navigation
    setCurrentSection("dashboard")

    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateDashboardData())
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
        <h1 className="text-3xl font-bold">Muscat Bay Operations Dashboard</h1>
        <p className="text-muted-foreground">Overview of all utility services and operations</p>
      </header>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Water Consumption"
          value="7,245"
          unit="m³"
          change={5.2}
          trend="up"
          icon={<Droplets className="h-6 w-6 text-blue-500" />}
        />
        <KpiCard
          title="Electricity Usage"
          value="324,690"
          unit="kWh"
          change={-2.7}
          trend="down"
          icon={<Zap className="h-6 w-6 text-yellow-500" />}
        />
        <KpiCard
          title="STP Throughput"
          value="4,120"
          unit="m³"
          change={1.5}
          trend="up"
          icon={<Recycle className="h-6 w-6 text-green-500" />}
        />
        <KpiCard
          title="Waste Collected"
          value="12.8"
          unit="tons"
          change={-3.1}
          trend="down"
          icon={<Trash2 className="h-6 w-6 text-red-500" />}
        />
        <KpiCard
          title="Contractor Jobs"
          value="34"
          unit="active"
          change={12.5}
          trend="up"
          icon={<HardHat className="h-6 w-6 text-orange-500" />}
        />
        <KpiCard
          title="Operational Efficiency"
          value="87.3"
          unit="%"
          change={2.1}
          trend="up"
          icon={<Activity className="h-6 w-6 text-purple-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Water & Electricity Usage Chart */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Water & Electricity Monthly Usage</h2>
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
                  dataKey="water"
                  name="Water (m³)"
                  stroke="var(--chart-1)"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="electricity"
                  name="Electricity (kWh)"
                  stroke="var(--chart-2)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STP Plant & Waste Chart */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">STP Plant Efficiency & Waste Collection</h2>
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
                  dataKey="stpEfficiency"
                  name="STP Efficiency (%)"
                  fill="var(--chart-3)"
                />
                <Bar
                  dataKey="wasteCollection"
                  name="Waste (tons)"
                  fill="var(--chart-4)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// KPI Card Component
function KpiCard({
  title,
  value,
  unit,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  unit: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
          </div>
          <div className="flex items-center mt-2">
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`ml-1 text-sm ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}%
            </span>
            <span className="ml-1 text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
      </div>
    </div>
  )
}

// Generate sample dashboard data
function generateDashboardData() {
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
    const waterBase = 6000 + Math.random() * 3000
    const electricityBase = 300000 + Math.random() * 50000
    const stpEfficiencyBase = 75 + Math.random() * 20
    const wasteCollectionBase = 10 + Math.random() * 8

    // Add seasonal variations
    const seasonalFactor = Math.sin((index / 11) * Math.PI * 2) // Full sine wave across the year
    
    return {
      month,
      water: Math.round(waterBase + seasonalFactor * 1500), // More water in summer
      electricity: Math.round(electricityBase + seasonalFactor * 25000), // More electricity in summer
      stpEfficiency: Math.round(stpEfficiencyBase - Math.abs(seasonalFactor) * 5), // Lower efficiency at peak seasons
      wasteCollection: Math.round((wasteCollectionBase + seasonalFactor * 2) * 10) / 10, // More waste in summer
    }
  })
}