import { Suspense } from "react"
import ProductGrid from "@/components/shop/product-grid"
import FilterSidebar from "@/components/shop/filter-sidebar"
import FilterBar from "@/components/shop/filter-bar"
import { ProductSkeleton } from "@/components/shop/loading-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const productsData = [
  {
    id: 1,
    name: "Essential Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    isNew: true,
    colors: ["#000000", "#FFFFFF", "#808080"],
    brand: "Essential",
    rating: 4.5,
    category: "T-Shirts",
  },
  {
    id: 2,
    name: "Denim Jacket Classic",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
    colors: ["#000080", "#4B0082"],
    brand: "Denim Co",
    rating: 4.8,
    category: "Jackets",
  },
  // ... more products
]

const categories = [
  {
    name: "New Arrivals",
    count: 120,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  },
  { name: "Trending Now", count: 86, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" },
  { name: "Best Sellers", count: 92, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80" },
]

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=80"
            alt="Shop Hero"
            className="h-full w-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <h1 className="text-4xl sm:text-5xl font-bold max-w-2xl leading-tight mb-6">Discover Your Perfect Style</h1>
          <p className="text-lg text-gray-300 max-w-xl mb-8">
            Explore our curated collection of premium fashion essentials.
          </p>
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            Shop New Arrivals
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="group relative h-64 overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.count} Products</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent border-white text-white hover:bg-white hover:text-black"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Shop Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <FilterSidebar />
            </aside>

            {/* Main Content */}
            <main>
              <FilterBar />
              <Suspense fallback={<ProductSkeleton />}>
                <ProductGrid products={productsData} />
              </Suspense>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

