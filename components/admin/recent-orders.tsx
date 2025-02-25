import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    status: "processing",
    total: "$245.99",
    date: "2024-02-25",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    status: "shipped",
    total: "$189.50",
    date: "2024-02-24",
  },
  {
    id: "ORD003",
    customer: "Robert Wilson",
    status: "delivered",
    total: "$499.99",
    date: "2024-02-23",
  },
  {
    id: "ORD004",
    customer: "Sarah Davis",
    status: "processing",
    total: "$129.00",
    date: "2024-02-22",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "delivered" ? "default" : order.status === "processing" ? "secondary" : "outline"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{order.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

