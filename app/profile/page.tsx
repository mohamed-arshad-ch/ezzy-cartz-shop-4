"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Lock, CreditCard, LogOut, Edit, Plus, Check, Clock, Truck, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import ProductCard from "@/components/product-card"

// Mock data
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-02-25",
    total: 179.97,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Essential Cotton T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        color: "Black",
        size: "M",
      },
      {
        id: 2,
        name: "Denim Jacket Classic",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
        color: "Blue",
        size: "L",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-20",
    total: 159.98,
    status: "processing",
    items: [
      {
        id: 3,
        name: "Summer Floral Dress",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
        color: "Pink",
        size: "S",
      },
    ],
  },
]

const addresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    isDefault: false,
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    colors: ["#000000", "#FFFFFF", "#808080"],
  },
  {
    id: 2,
    name: "Vintage Denim Jacket",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
    colors: ["#000080", "#4B0082"],
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 h-32 bg-gradient-to-r from-blue-600 to-blue-400" />
          <div className="relative container mx-auto px-4">
            <div className="flex items-end gap-6 pt-24">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">John Doe</h1>
                <p className="text-blue-100">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="border-b bg-white sticky top-0 z-10">
            <div className="container mx-auto">
              <TabsList className="flex h-12 items-center gap-4 overflow-x-auto">
                <TabsTrigger
                  value="overview"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-black"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-black"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="addresses"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-black"
                >
                  Addresses
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-black"
                >
                  Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-black"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Your existing cards with updated styling */}
              <Card className="backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your last 2 orders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.slice(0, 2).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p
                          className={cn(
                            "text-sm capitalize",
                            order.status === "delivered" ? "text-green-600" : "text-blue-600",
                          )}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Your shipping addresses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.slice(0, 2).map((address) => (
                    <div key={address.id} className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-gray-500">{address.street}</p>
                        <p className="text-sm text-gray-500">
                          {address.city}, {address.state} {address.zip}
                        </p>
                      </div>
                      {address.isDefault && (
                        <Badge variant="outline" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive order updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Auth</Label>
                      <p className="text-sm text-gray-500">Enhanced security</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-8">
            {orders.map((order) => (
              <Card key={order.id} className="backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{order.id}</CardTitle>
                      <CardDescription>Ordered on {order.date}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p
                        className={cn(
                          "text-sm capitalize",
                          order.status === "delivered" ? "text-green-600" : "text-blue-600",
                        )}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Order Timeline */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between relative">
                      <div className="flex-1 border-t border-gray-200" />
                      {[
                        { icon: ShoppingBag, label: "Order Placed" },
                        { icon: Clock, label: "Processing" },
                        { icon: Truck, label: "Shipped" },
                        { icon: Check, label: "Delivered" },
                      ].map((step, index) => (
                        <div
                          key={step.label}
                          className={cn("relative flex flex-col items-center", index < 3 && "flex-1")}
                        >
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full border-2 flex items-center justify-center bg-white",
                              order.status === "delivered"
                                ? "border-green-600 text-green-600"
                                : "border-gray-300 text-gray-300",
                            )}
                          >
                            <step.icon className="h-4 w-4" />
                          </div>
                          <p className="mt-2 text-xs text-gray-500">{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative aspect-square w-20 overflow-hidden rounded-lg bg-gray-100">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.color} / {item.size}
                          </p>
                          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="addresses" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {addresses.map((address) => (
                <Card key={address.id} className="backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{address.name}</CardTitle>
                        {address.isDefault && (
                          <Badge variant="outline" className="mt-2">
                            Default Address
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{address.street}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p className="text-gray-600">{address.country}</p>
                  </CardContent>
                </Card>
              ))}

              <Card className="backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Add New Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add Address
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 000-0000" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Updates</Label>
                        <p className="text-sm text-gray-500">Receive updates about your orders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Promotions</Label>
                        <p className="text-sm text-gray-500">Receive emails about new promotions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Newsletter</Label>
                        <p className="text-sm text-gray-500">Subscribe to our newsletter</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Lock className="h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Bell className="h-4 w-4" />
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <CreditCard className="h-4 w-4" />
                      Manage Payment Methods
                    </Button>
                    <Separator />
                    <Button variant="destructive" className="w-full justify-start gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

