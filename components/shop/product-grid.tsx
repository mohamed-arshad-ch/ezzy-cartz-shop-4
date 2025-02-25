"use client"

import { useEffect, useState, useCallback } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  isNew?: boolean
  colors?: string[]
  brand?: string
  rating?: number
  category?: string
  discount?: number
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products: initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  // Simulate loading more products
  const loadMore = useCallback(async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Add more products (in this case, we'll just duplicate the existing ones)
    setProducts([...products, ...initialProducts])
    setPage(page + 1)
    setLoading(false)
  }, [products, initialProducts, page])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore()
        }
      },
      { threshold: 1.0 },
    )

    const sentinel = document.getElementById("sentinel")
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => observer.disconnect()
  }, [loading, loadMore])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={`${product.id}-${page}`} product={product} variant="compact" />
        ))}
      </div>

      {/* Loading sentinel */}
      <div id="sentinel" className="h-8 flex items-center justify-center mt-8">
        {loading && (
          <Button variant="ghost" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more products...
          </Button>
        )}
      </div>
    </div>
  )
}

