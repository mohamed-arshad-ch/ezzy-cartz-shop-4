"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  MapPin,
  Package,
  Printer,
  RefreshCw,
  Send,
  Truck,
  User,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface OrderDetailsProps {
  order: any // Replace with proper type
}

const statusColors = {
  processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  refunded: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

const paymentStatusColors = {
  paid: "bg-green-500/10 text-green-500 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  refunded: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  failed: "bg-red-500/10 text-red-500 border-red-500/20",
}

const shippingStatusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const [status, setStatus] = useState(order.status)
  const [shippingStatus, setShippingStatus] = useState(order.shippingStatus)

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>

      <div className="mt-6 space-y-6">
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Order Summary */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order {order.id}</CardTitle>
                    <CardDescription>{format(new Date(order.date), "PPP")}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusColors[status as keyof typeof statusColors])}
                  >
                    {status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex-1">Update Status</Button>
                </div>
                <div className="flex justify-between gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Send className="h-4 w-4" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Contact Information</p>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Shipping Address</p>
                  <p className="text-sm">{order.customer.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-green-500 p-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 border-l-2 border-gray-200" />
                  </div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(order.date), "PPP p")}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-blue-500 p-1">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 border-l-2 border-gray-200" />
                  </div>
                  <div>
                    <p className="font-medium">Payment Confirmed</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(order.date), "PPP p")}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-yellow-500 p-1">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 border-l-2 border-gray-200" />
                  </div>
                  <div>
                    <p className="font-medium">Processing Order</p>
                    <p className="text-sm text-muted-foreground">Order is being prepared for shipping</p>
                  </div>
                </div>

                {order.status !== "cancelled" && (
                  <>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "rounded-full p-1",
                            order.shippingStatus === "shipped" ? "bg-blue-500" : "bg-gray-200",
                          )}
                        >
                          <Truck
                            className={cn(
                              "h-4 w-4",
                              order.shippingStatus === "shipped" ? "text-white" : "text-gray-400",
                            )}
                          />
                        </div>
                        <div className="flex-1 border-l-2 border-gray-200" />
                      </div>
                      <div>
                        <p className="font-medium">Out for Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping.estimatedDelivery
                            ? `Estimated delivery by ${format(new Date(order.shipping.estimatedDelivery), "PPP")}`
                            : "Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "rounded-full p-1",
                            order.status === "delivered" ? "bg-green-500" : "bg-gray-200",
                          )}
                        >
                          <CheckCircle2
                            className={cn("h-4 w-4", order.status === "delivered" ? "text-white" : "text-gray-400")}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping.deliveredAt
                            ? format(new Date(order.shipping.deliveredAt), "PPP p")
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-gray-100">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>${item.price.toFixed(2)} each</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(order.total * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(order.total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Tab */}
        <TabsContent value="shipping">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="grid gap-1">
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-sm text-muted-foreground">{order.customer.address}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Shipping Method</p>
                    <p className="text-sm">{order.shipping.method}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-sm">{order.shipping.trackingNumber || "N/A"}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Carrier</p>
                    <p className="text-sm">{order.shipping.carrier || "N/A"}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm">
                      {order.shipping.estimatedDelivery
                        ? format(new Date(order.shipping.estimatedDelivery), "PPP")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-4">
                  <Select value={shippingStatus} onValueChange={setShippingStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Update shipping status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex-1">Update Shipping Status</Button>
                </div>

                <div className="flex justify-between gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Track Order
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Update Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.shipping.trackingNumber ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500 p-1">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Package Shipped</p>
                          <p className="text-sm text-muted-foreground">Via {order.shipping.carrier}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-500 p-1">
                          <Truck className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">In Transit</p>
                          <p className="text-sm text-muted-foreground">
                            Estimated delivery by {format(new Date(order.shipping.estimatedDelivery), "PPP")}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-yellow-500 p-1">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Pending Shipment</p>
                        <p className="text-sm text-muted-foreground">Order is being prepared for shipping</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="grid gap-1">
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-muted-foreground">
                      {order.payment.method}
                      {order.payment.cardLast4 && ` ending in ${order.payment.cardLast4}`}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Transaction ID</p>
                    <p className="text-sm font-mono">{order.payment.transactionId}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Payment Status</p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors],
                      )}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  {order.payment.refundId && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Refund ID</p>
                      <p className="text-sm font-mono">{order.payment.refundId}</p>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(order.total * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Paid</span>
                    <span>${(order.total * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                {order.status !== "cancelled" && order.status !== "refunded" && (
                  <Button variant="destructive" className="mt-4">
                    Issue Refund
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-500 p-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(order.date), "PPP p")}</p>
                    </div>
                  </div>

                  {order.payment.refundId && (
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-red-500 p-1">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Refund Issued</p>
                        <p className="text-sm text-muted-foreground">
                          Full refund of ${(order.total * 1.1).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}

