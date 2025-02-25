"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, Filter, MoreHorizontal, Search, ArrowUpDown, Eye, Truck, Package, XCircle } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import OrderDetails from "./order-details"

// Mock data for orders
const orders = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      address: "123 Main St, New York, NY 10001",
    },
    date: "2024-02-25T10:30:00",
    total: 299.99,
    status: "processing",
    paymentStatus: "paid",
    shippingStatus: "pending",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 100.0,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
      transactionId: "txn_123456",
    },
    shipping: {
      method: "Express",
      trackingNumber: "1Z999AA1234567890",
      carrier: "UPS",
      estimatedDelivery: "2024-02-28",
    },
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 891",
      address: "456 Oak St, Los Angeles, CA 90001",
    },
    date: "2024-02-24T15:45:00",
    total: 149.99,
    status: "delivered",
    paymentStatus: "paid",
    shippingStatus: "delivered",
    items: [
      {
        id: 3,
        name: "Running Shoes",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    payment: {
      method: "PayPal",
      email: "jane@example.com",
      transactionId: "txn_123457",
    },
    shipping: {
      method: "Standard",
      trackingNumber: "1Z999AA1234567891",
      carrier: "USPS",
      estimatedDelivery: "2024-02-27",
      deliveredAt: "2024-02-26",
    },
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Robert Wilson",
      email: "robert@example.com",
      phone: "+1 234 567 892",
      address: "789 Pine St, Chicago, IL 60601",
    },
    date: "2024-02-24T09:15:00",
    total: 499.99,
    status: "cancelled",
    paymentStatus: "refunded",
    shippingStatus: "cancelled",
    items: [
      {
        id: 4,
        name: "Smartphone",
        price: 499.99,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      transactionId: "txn_123458",
      refundId: "ref_123458",
    },
    shipping: {
      method: "Express",
      trackingNumber: null,
      carrier: null,
      estimatedDelivery: null,
      cancelledAt: "2024-02-24T10:30:00",
    },
  },
]

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

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const router = useRouter()

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  return (
    <div className="container flex flex-col gap-8 p-4 sm:p-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track your orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="default" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-8 w-[200px] sm:w-[300px]" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange className="w-[300px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Order
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Payment</TableHead>
                  <TableHead className="text-center">Shipping</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {format(new Date(order.date), "MMM d, yyyy")}
                      <div className="text-xs text-muted-foreground">{format(new Date(order.date), "h:mm a")}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{order.customer.name}</span>
                        <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusColors[order.status as keyof typeof statusColors])}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors],
                        )}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          shippingStatusColors[order.shippingStatus as keyof typeof shippingStatusColors],
                        )}
                      >
                        {order.shippingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Update Shipping
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View and manage order information</DialogDescription>
          </DialogHeader>
          {selectedOrder && <OrderDetails order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

