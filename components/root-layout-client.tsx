"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  return isAdminRoute ? (
    // Admin Layout - No header/footer
    <div className="min-h-screen bg-background">{children}</div>
  ) : (
    // Main Layout - With header/footer
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

