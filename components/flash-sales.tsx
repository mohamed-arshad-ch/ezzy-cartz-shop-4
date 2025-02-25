import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function FlashSales() {
  const flashSaleProducts = [
    {
      id: 1,
      name: "Summer Dress",
      price: 49.99,
      originalPrice: 89.99,
      discount: 45,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 69.99,
      originalPrice: 119.99,
      discount: 40,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      name: "Classic Tee",
      price: 19.99,
      originalPrice: 29.99,
      discount: 35,
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">Flash Sales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {flashSaleProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-4 right-4 bg-red-600">-{product.discount}%</Badge>
              </div>
              <h3 className="text-sm font-medium mb-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-red-600">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

