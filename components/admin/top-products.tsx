import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const topProducts = [
  {
    name: "Cotton T-Shirt",
    image: "/placeholder.svg",
    revenue: 12500,
    sales: 200,
    progress: 85,
  },
  {
    name: "Denim Jeans",
    image: "/placeholder.svg",
    revenue: 9800,
    sales: 150,
    progress: 65,
  },
  {
    name: "Sneakers",
    image: "/placeholder.svg",
    revenue: 7500,
    sales: 100,
    progress: 50,
  },
  {
    name: "Hoodie",
    image: "/placeholder.svg",
    revenue: 6000,
    sales: 80,
    progress: 40,
  },
]

export function TopProducts() {
  return (
    <div className="space-y-8">
      {topProducts.map((product) => (
        <div key={product.name} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={product.image} alt={product.name} />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex-1">{product.sales} sales</span>
              <span>${product.revenue.toLocaleString()}</span>
            </div>
            <Progress value={product.progress} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

