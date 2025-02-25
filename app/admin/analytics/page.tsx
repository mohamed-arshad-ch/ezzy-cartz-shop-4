"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, DollarSign, ShoppingBag, Users, CreditCard } from "lucide-react"

// Mock data
const salesData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
  revenue: Math.floor(Math.random() * 50000) + 10000,
  orders: Math.floor(Math.random() * 500) + 100,
}))

const topProducts = [
  { name: "Product A", value: 400, color: "#0ea5e9" },
  { name: "Product B", value: 300, color: "#6366f1" },
  { name: "Product C", value: 200, color: "#8b5cf6" },
  { name: "Product D", value: 100, color: "#ec4899" },
]

const customerLocations = [
  { name: "United States", value: 40, color: "#0ea5e9" },
  { name: "United Kingdom", value: 25, color: "#6366f1" },
  { name: "Germany", value: 20, color: "#8b5cf6" },
  { name: "France", value: 15, color: "#ec4899" },
]

export default function AnalyticsPage() {
  return (
    <div className="container flex flex-col gap-8 p-4 sm:p-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your store's performance</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Select defaultValue="daily">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <DollarSign className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$45,231</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-green-500">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <ShoppingBag className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">2,345</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-green-500">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm">8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-500/10 p-3">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">1,892</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-red-500">
                <ArrowDown className="h-4 w-4" />
                <span className="text-sm">3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-yellow-500/10 p-3">
                  <CreditCard className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-2xl font-bold">$124</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-green-500">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="currentColor"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topProducts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Demographics</CardTitle>
            <CardDescription>Customer distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerLocations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {customerLocations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Orders vs Revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

