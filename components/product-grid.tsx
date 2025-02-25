import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} className="group">
          <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-sm font-medium mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  )
}

