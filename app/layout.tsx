import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./custom-styles.css"
import { AppProvider } from "@/context/app-context"
import { InputDetector } from "@/components/input-detector"
import { MainContent } from "@/components/layout/main-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muscat Bay Operations Dashboard",
  description: "Operational dashboard for Muscat Bay water, electricity, STP plant, and contractor management",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InputDetector />
        <AppProvider>
          <MainContent>{children}</MainContent>
        </AppProvider>
      </body>
    </html>
  )
}