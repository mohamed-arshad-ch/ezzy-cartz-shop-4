"use client"

import { useState } from "react"
import Image from "next/image"
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
import {
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Ban,
  ArrowUpDown,
  User,
  ShoppingBag,
  Calendar,
  DollarSign,
} from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { format } from "date-fns"
import CustomerDetails from "./customer-details"

// Mock customers data
const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    dateJoined: "2024-01-15",
    totalOrders: 15,
    totalSpent: 1299.99,
    status: "active",
    lastOrder: "2024-02-20",
    avatar: "/placeholder.svg",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    orders: [
      {
        id: "ORD001",
        date: "2024-02-20",
        total: 199.99,
        status: "delivered",
      },
      {
        id: "ORD002",
        date: "2024-01-15",
        total: 299.99,
        status: "processing",
      },
    ],
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    dateJoined: "2024-02-01",
    totalOrders: 3,
    totalSpent: 399.99,
    status: "active",
    lastOrder: "2024-02-15",
    avatar: "/placeholder.svg",
    address: {
      street: "456 Oak St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    orders: [
      {
        id: "ORD003",
        date: "2024-02-15",
        total: 199.99,
        status: "delivered",
      },
    ],
  },
  // Add more mock customers...
]

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="container flex flex-col gap-8 p-4 sm:p-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            Email All
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
                <Input placeholder="Search customers..." className="pl-8 w-[200px] sm:w-[300px]" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange className="w-[300px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-500/10 p-3">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">2,350</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <ShoppingBag className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">1,890</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-yellow-500/10 p-3">
                <Calendar className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">245</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-500/10 p-3">
                <DollarSign className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Spend</p>
                <p className="text-2xl font-bold">$485</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Customer
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Last Order</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={customer.avatar || "/placeholder.svg"}
                            alt={customer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(customer.dateJoined), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-center">{customer.totalOrders}</TableCell>
                    <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={
                          customer.status === "active"
                            ? "border-green-500 text-green-500"
                            : "border-red-500 text-red-500"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{format(new Date(customer.lastOrder), "MMM d, yyyy")}</TableCell>
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
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCustomer(customer)
                              setIsDetailsOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="mr-2 h-4 w-4" />
                            Block Customer
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

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>View customer information and history</DialogDescription>
          </DialogHeader>
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

