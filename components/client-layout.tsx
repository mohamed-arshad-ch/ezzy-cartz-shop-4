"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isAdminRoute = window.location.pathname.startsWith("/admin")
    setIsAdmin(isAdminRoute)
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return null
  }

  return isAdmin ? (
    children
  ) : (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

