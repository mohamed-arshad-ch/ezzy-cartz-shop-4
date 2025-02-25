import { Suspense } from "react"
import ProductGallery from "@/components/product/gallery"
import ProductInfo from "@/components/product/info"
import ProductTabs from "@/components/product/tabs"
import RelatedProducts from "@/components/product/related-products"
import { ProductSkeleton } from "@/components/shop/loading-skeleton"

// Mock product data
const product = {
  id: 1,
  name: "Premium Cotton Blend T-Shirt",
  price: 49.99,
  rating: 4.8,
  reviewCount: 128,
  description:
    "Experience ultimate comfort with our premium cotton blend t-shirt. Made with high-quality materials and attention to detail, this versatile piece is perfect for any casual occasion.",
  details: {
    material: "95% Cotton, 5% Elastane",
    care: "Machine wash cold, tumble dry low",
    fit: "Regular fit",
    origin: "Made in Portugal",
  },
  features: [
    "Breathable cotton blend fabric",
    "Reinforced stitching",
    "Pre-shrunk material",
    "Tag-free neck label",
    "Available in multiple colors",
  ],
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
  ],
  variants: {
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Navy", value: "#000080" },
      { name: "Gray", value: "#808080" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  reviews: [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      date: "2024-02-20",
      title: "Perfect fit and great quality",
      content:
        "I'm really impressed with the quality of this t-shirt. The fabric is soft and comfortable, and the fit is exactly what I was looking for.",
      verified: true,
      helpful: 24,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"],
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      date: "2024-02-18",
      title: "Good quality but sizing runs small",
      content:
        "The quality is great and the material feels premium. Just note that the sizing runs a bit small, so you might want to order one size up.",
      verified: true,
      helpful: 18,
    },
  ],
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 py-8">
            {/* Product Gallery */}
            <Suspense fallback={<ProductSkeleton />}>
              <ProductGallery images={product.images} />
            </Suspense>

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="container mx-auto px-4 py-12">
        <ProductTabs product={product} />
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <RelatedProducts />
      </div>
    </div>
  )
}

