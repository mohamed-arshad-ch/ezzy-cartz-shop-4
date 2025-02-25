"use client"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Mail, Phone, MapPin, DollarSign, ShoppingBag, Package, Eye } from "lucide-react"
import Link from "next/link"

interface CustomerDetailsProps {
  customer: any
}

export default function CustomerDetails({ customer }: CustomerDetailsProps) {
  const purchaseHistory = Array.from({ length: 12 }, (_, i) => ({
    month: format(new Date(2024, i, 1), "MMM"),
    amount: Math.floor(Math.random() * 500) + 100,
  }))

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>

      <div className="mt-6 space-y-6">
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Profile */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{customer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{customer.name}</CardTitle>
                    <CardDescription>
                      Customer since {format(new Date(customer.dateJoined), "MMMM yyyy")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {customer.address.street}, {customer.address.city}, {customer.address.state} {customer.address.zip}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      variant="outline"
                      className={
                        customer.status === "active" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase History Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>Monthly purchase trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={purchaseHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="currentColor" className="fill-primary" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all orders from this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {customer.orders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{order.id}</p>
                          <Badge
                            variant="outline"
                            className={
                              order.status === "delivered"
                                ? "border-green-500 text-green-500"
                                : "border-blue-500 text-blue-500"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{format(new Date(order.date), "PPP")}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View order</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track customer interactions and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {/* Example activity items */}
                  <div className="flex gap-4">
                    <div className="rounded-full bg-blue-500/10 p-2">
                      <ShoppingBag className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm">Placed a new order</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="rounded-full bg-yellow-500/10 p-2">
                      <Package className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm">Received order delivery</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="rounded-full bg-green-500/10 p-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm">Made a purchase</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Customer Preferences</CardTitle>
              <CardDescription>Communication and marketing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <p className="font-medium">Email Marketing</p>
                    <p className="text-sm text-muted-foreground">Receive promotional emails and newsletters</p>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Subscribed
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive order updates via SMS</p>
                  </div>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Unsubscribed
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <p className="font-medium">Account Privacy</p>
                    <p className="text-sm text-muted-foreground">Data sharing and privacy settings</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  )
}

