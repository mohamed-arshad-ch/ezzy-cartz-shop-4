"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Trash2,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for stats
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: 20.1,
    icon: DollarSign,
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Active Customers",
    value: "2,350",
    change: -4.5,
    icon: Users,
    color: "from-violet-600 to-violet-400",
  },
  {
    title: "New Orders",
    value: "12,234",
    change: 15.2,
    icon: ShoppingBag,
    color: "from-pink-600 to-pink-400",
  },
  {
    title: "Growth Rate",
    value: "23%",
    change: 8.9,
    icon: TrendingUp,
    color: "from-emerald-600 to-emerald-400",
  },
]

// Mock data for charts
const revenueData = Array.from({ length: 12 }, (_, i) => ({
  name: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
  revenue: Math.floor(Math.random() * 5000) + 3000,
  orders: Math.floor(Math.random() * 100) + 50,
}))

const categoryData = [
  { name: "Electronics", value: 400, color: "#3b82f6" },
  { name: "Clothing", value: 300, color: "#8b5cf6" },
  { name: "Books", value: 300, color: "#ec4899" },
  { name: "Home", value: 200, color: "#10b981" },
]

// Mock orders data
const initialOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    product: "iPhone 13 Pro",
    amount: 999.99,
    status: "processing",
    date: "2024-02-25",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    product: "MacBook Air",
    amount: 1299.99,
    status: "shipped",
    date: "2024-02-24",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    product: "AirPods Pro",
    amount: 249.99,
    status: "delivered",
    date: "2024-02-24",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD004",
    customer: "Sarah Wilson",
    product: "iPad Mini",
    amount: 499.99,
    status: "processing",
    date: "2024-02-23",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD005",
    customer: "Tom Brown",
    product: "Apple Watch",
    amount: 399.99,
    status: "shipped",
    date: "2024-02-23",
    avatar: "/placeholder.svg",
  },
]

function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string
  value: string
  change: number
  icon: React.ElementType
  color: string
}) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="w-full">
      <Card className="relative overflow-hidden backdrop-blur-sm border-0 shadow-lg">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`rounded-xl bg-gradient-to-br ${color} p-2 text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1",
                change > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600",
              )}
            >
              {change > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function OrderTable({ orders }: { orders: typeof initialOrders }) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background">
      <ScrollArea className="h-[400px]">
        <div className="flex flex-col gap-2 p-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={order.avatar} alt={order.customer} />
                  <AvatarFallback>{order.customer.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{order.customer}</p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        order.status === "delivered" && "border-emerald-500 text-emerald-500",
                        order.status === "processing" && "border-blue-500 text-blue-500",
                        order.status === "shipped" && "border-amber-500 text-amber-500",
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.product}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">${order.amount.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState(initialOrders)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ["processing", "shipped", "delivered"]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      const randomOrder = Math.floor(Math.random() * orders.length)

      setOrders((prevOrders) =>
        prevOrders.map((order, index) => (index === randomOrder ? { ...order, status: randomStatus } : order)),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [orders])

  return (
    <div className="container flex flex-col gap-8 p-4 sm:p-8 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block font-medium">Admin</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="wait">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </AnimatePresence>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.substring(0, 3)}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                                <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#revenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{payload[0].name}</span>
                              <span className="text-sm text-muted-foreground">Value: {payload[0].value}</span>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage and monitor recent orders</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Tabs defaultValue="all" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <OrderTable orders={orders} />
        </CardContent>
      </Card>
    </div>
  )
}

