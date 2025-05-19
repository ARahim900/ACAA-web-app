"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Droplets, Zap, Building2, Users, ChevronLeft } from "lucide-react"

export default function MainDashboard() {
  const { setCurrentSection } = useAppContext()
  const [waterData, setWaterData] = useState<any[]>([])
  const [electricityData, setElectricityData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("monthly")

  useEffect(() => {
    // Set current section for sidebar navigation
    setCurrentSection("dashboard")

    // Simulate data loading
    const timer = setTimeout(() => {
      setWaterData(generateWaterData())
      setElectricityData(generateElectricityData())
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [setCurrentSection])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin h-8 w-8 border-4 border-[#4f4359] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-[#4f4359] text-white px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Muscat Bay Dashboard</h1>
            <p className="text-[#d1d1d1] mt-1">Utility Management System Overview</p>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="flex">
              <button 
                className={`px-4 py-2 ${viewMode === 'realtime' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`}
                onClick={() => setViewMode('realtime')}
              >
                Realtime
              </button>
              <button 
                className={`px-4 py-2 ${viewMode === 'monthly' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`}
                onClick={() => setViewMode('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-semibold text-[#4f4359] mb-6">System Performance Overview</h2>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Water Analytics Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-medium">Water Analytics</h3>
              <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">L1</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Water supply and consumption metrics</p>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Loss</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">7.6</span>
                <span className="text-xl ml-1">%</span>
              </div>
              <p className="text-sm text-green-600 mb-3">Within target</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Supply:</p>
                  <p className="font-medium">34,915 m³</p>
                </div>
                <div>
                  <p className="text-gray-500">Consumption:</p>
                  <p className="font-medium">32,264 m³</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Electricity Management Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-medium">Electricity Management</h3>
              <span className="text-xs font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded">92%</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Power consumption and distribution</p>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Usage</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">78,479</span>
                <span className="text-xl ml-1">kWh</span>
              </div>
              <div className="flex items-center text-sm text-red-500 mb-3">
                <span className="text-red-500 mr-1">↓</span>
                <span>26.7% vs last period</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-500">Efficiency: 92% | Peak: 14,971 kWh</p>
              </div>
            </div>
          </div>
          
          {/* STP Plant Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-medium">STP Plant</h3>
              <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">High</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Sewage treatment performance</p>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Efficiency</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">105.3</span>
                <span className="text-xl ml-1">%</span>
              </div>
              <div className="flex items-center text-sm text-red-500 mb-3">
                <span className="text-red-500 mr-1">↓</span>
                <span>6.9% decrease</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Daily Flow: 16.9 m³/day</p>
                </div>
                <div>
                  <p className="text-gray-500">Monthly: 506 m³</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contractor Tracker Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-teal-500" />
              <h3 className="text-lg font-medium">Contractor Tracker</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Contractor agreements and status</p>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Contracts</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">5</span>
              </div>
              <p className="text-sm text-orange-500 mb-3">2 contracts expiring soon</p>
              
              <div className="flex space-x-4 text-sm">
                <div className="bg-green-100 text-green-800 p-2 rounded">
                  <p>Active:</p>
                  <p className="font-medium text-center">5</p>
                </div>
                <div className="bg-orange-100 text-orange-800 p-2 rounded">
                  <p>Expiring:</p>
                  <p className="font-medium text-center">2</p>
                </div>
                <div className="bg-red-100 text-red-800 p-2 rounded">
                  <p>Expired:</p>
                  <p className="font-medium text-center">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Water Supply vs Consumption Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Water Supply vs Consumption</h3>
            <p className="text-sm text-gray-500 mb-4">Trend analysis with loss percentage</p>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={waterData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="supply" 
                    name="Supply (L1)" 
                    stroke="#4f4359" 
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="distribution" 
                    name="Distribution (L2)" 
                    stroke="#9c92ac" 
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    name="Consumption (L3)" 
                    stroke="#36d1dc" 
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Electricity Consumption Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Electricity Consumption</h3>
            <p className="text-sm text-gray-500 mb-4">Monthly consumption patterns</p>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={electricityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="consumption" 
                    name="Consumption (kWh)" 
                    fill="#f6b93b" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate sample water data
function generateWaterData() {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
  return months.map((name, index) => {
    let baseSupply = 35000
    let baseDistribution = 32000
    let baseConsumption = 30000
    
    // Add some natural variation to the data
    if (index === 1 || index === 2) { // Nov, Dec
      baseSupply -= 5000
      baseDistribution -= 3000
      baseConsumption -= 3500
    } else if (index === 4) { // Feb
      baseSupply += 10000
      baseDistribution += 5000
      baseConsumption += 3000
    }
    
    // Add randomness
    const supplyRandom = Math.random() * 2000 - 1000
    const distributionRandom = Math.random() * 2000 - 1000
    const consumptionRandom = Math.random() * 1500 - 750
    
    return {
      name,
      supply: Math.round(baseSupply + supplyRandom),
      distribution: Math.round(baseDistribution + distributionRandom),
      consumption: Math.round(baseConsumption + consumptionRandom),
    }
  })
}

// Generate sample electricity data
function generateElectricityData() {
  return [
    { name: "Nov-24", consumption: 134000 },
    { name: "Dec-24", consumption: 130000 },
    { name: "Jan-25", consumption: 128000 },
    { name: "Feb-25", consumption: 120000 },
    { name: "Mar-25", consumption: 105000 },
    { name: "Apr-25", consumption: 78000 },
  ]
}