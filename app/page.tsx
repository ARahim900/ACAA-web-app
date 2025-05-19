"use client"

import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Dynamically import dashboard components
const MainDashboard = dynamic(() => import("@/components/dashboard/main-dashboard"), {
  loading: () => <LoadingSpinner />,
})

// Now include all the section dashboards since they've been created
const WaterDashboard = dynamic(() => import("@/components/water-dashboard"), {
  loading: () => <LoadingSpinner />,
})

const ElectricityDashboard = dynamic(() => import("@/features/electricity/components/electricity-dashboard"), {
  loading: () => <LoadingSpinner />,
})

const StpPlantDashboard = dynamic(() => import("@/features/stp-plant/components/stp-plant-dashboard"), {
  loading: () => <LoadingSpinner />,
})

const ContractorDashboard = dynamic(() => import("@/features/contractors/components/contractor-dashboard"), {
  loading: () => <LoadingSpinner />,
})

const WasteManagementDashboard = dynamic(() => import("@/features/waste-management/components/waste-management-dashboard"), {
  loading: () => <LoadingSpinner />,
})

export default function Home() {
  return <MainDashboard />
}