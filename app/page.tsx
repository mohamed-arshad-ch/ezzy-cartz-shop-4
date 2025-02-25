import ProductCard from "@/components/product-card"
import CategoryBanner from "@/components/category-banner"
import Newsletter from "@/components/newsletter"
import QuoteSection from "@/components/quote-section"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import HeroSection from "@/components/hero-section"

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Pink Cotton Shirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1618001789159-ffffe6f96ef2?w=800&q=80",
      isNew: true,
      colors: ["#FFC0CB", "#FFFFFF", "#000000"],
    },
    {
      id: 2,
      name: "Blue Casual Shirt",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      colors: ["#87CEEB", "#FFFFFF"],
    },
    {
      id: 3,
      name: "Yellow Summer Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&q=80",
      isNew: true,
      colors: ["#FFD700", "#FFF5E1"],
    },
    {
      id: 4,
      name: "Denim Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80",
      colors: ["#0000FF", "#000000"],
    },
  ]

  const bestSellers = [
    {
      id: 5,
      name: "White Basic Tee",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      colors: ["#FFFFFF", "#000000", "#808080"],
    },
    {
      id: 6,
      name: "Black Denim Jacket",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=800&q=80",
      colors: ["#000000", "#404040"],
    },
    {
      id: 7,
      name: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      colors: ["#FF0000", "#FFFFFF"],
    },
    {
      id: 8,
      name: "Casual Sneakers",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      colors: ["#FFFFFF", "#000000"],
    },
    {
      id: 9,
      name: "Hooded Sweatshirt",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      colors: ["#808080", "#000000"],
    },
    {
      id: 10,
      name: "Leather Boots",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
      colors: ["#8B4513", "#000000"],
    },
    {
      id: 11,
      name: "Canvas Shoes",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      colors: ["#FFFFFF", "#000000"],
    },
    {
      id: 12,
      name: "Sport Shoes",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      colors: ["#000000", "#FF0000"],
    },
  ]

  const flashSaleProducts = [
    {
      id: 13,
      name: "Summer Dress",
      price: 49.99,
      originalPrice: 89.99,
      discount: 45,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      colors: ["#FFB6C1", "#98FB98"],
    },
    {
      id: 14,
      name: "Casual Shirt",
      price: 34.99,
      originalPrice: 59.99,
      discount: 40,
      image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80",
      colors: ["#FFFFFF", "#000000"],
    },
    {
      id: 15,
      name: "Denim Pants",
      price: 44.99,
      originalPrice: 69.99,
      discount: 35,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      colors: ["#000080", "#4B0082"],
    },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Summer Fashion Trends",
      date: "2024-02-25",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      category: "Style Guide",
      excerpt: "Discover the hottest summer fashion trends for 2024.",
    },
    {
      id: 2,
      title: "Sustainable Fashion Guide",
      date: "2024-02-24",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
      category: "Fashion Tips",
      excerpt: "Learn how to build a sustainable wardrobe.",
    },
    {
      id: 3,
      title: "Essential Summer Wardrobe",
      date: "2024-02-23",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      category: "Style Guide",
      excerpt: "Build your perfect summer capsule wardrobe.",
    },
  ]

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      link: "#",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
      link: "#",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80",
      link: "#",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
      link: "#",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      link: "#",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      link: "#",
    },
  ]

  return (
    <div className="w-full">
      <HeroSection />
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Banners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryBanner
              title="Street Wear."
              description="Urban style for everyday comfort"
              image="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80"
              href="/category/street-wear"
            />
            <CategoryBanner
              title="Basic Shoes."
              description="Essential footwear collection"
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              href="/category/shoes"
            />
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Best Selling Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection quote="Style is a way to say who you are without having to speak." author="Rachel Zoe" />

      {/* Flash Sales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Flash Sales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* The Casual Selection Banner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CategoryBanner
            title="The Casual Selection."
            description="Comfort meets style"
            image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1800&q=80"
            href="/category/casual"
            fullWidth
          />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Our Journal</h2>
            <Link href="/blog" className="text-sm hover:underline">
              Read All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-medium group-hover:underline">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.category}</p>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Instagram className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Follow Our Instagram</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {instagramPosts.map((post) => (
              <Link
                key={post.id}
                href={post.link}
                className="aspect-square relative overflow-hidden group rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

