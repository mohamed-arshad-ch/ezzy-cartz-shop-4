"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [storeInfo, setStoreInfo] = useState({
    name: "My Store",
    email: "contact@mystore.com",
    phone: "+1 234 567 890",
    address: "123 Store Street",
    currency: "USD",
  })

  return (
    <div className="container flex flex-col gap-8 p-4 sm:p-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-8">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="store"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Store
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Payment
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Shipping
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="tax"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Tax
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Advanced
            </TabsTrigger>
          </div>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Manage your store details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" value={storeInfo.name} onChange={() => {}} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email</Label>
                    <Input id="store-email" type="email" value={storeInfo.email} onChange={() => {}} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone</Label>
                    <Input id="store-phone" type="tel" value={storeInfo.phone} onChange={() => {}} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Address</Label>
                    <Input id="store-address" value={storeInfo.address} onChange={() => {}} />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Customize your site appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to prevent customers from accessing your store
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                  </div>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value="store">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Configuration</CardTitle>
                <CardDescription>Configure your store settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Order Number Format</Label>
                  <Input placeholder="ORD-{number}" defaultValue="ORD-{number}" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inventory Tracking</Label>
                    <p className="text-sm text-muted-foreground">Track product inventory and stock levels</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>Set your store's operating hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">{/* Add business hours configuration */}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure accepted payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Stripe</Label>
                    <p className="text-sm text-muted-foreground">Accept credit card payments via Stripe</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>PayPal</Label>
                    <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Add other tab contents */}
      </Tabs>
    </div>
  )
}

