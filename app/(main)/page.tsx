import CategoryBanner from "@/components/category-banner"
import FlashSales from "@/components/flash-sales"
import BlogSection from "@/components/blog-section"
import InstagramFeed from "@/components/instagram-feed"
import Newsletter from "@/components/newsletter"
import ProductGrid from "@/components/product-grid"
import QuoteSection from "@/components/quote-section"

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <CategoryBanner />
        <ProductGrid />
        <FlashSales />
        <QuoteSection />
        <BlogSection />
        <InstagramFeed />
        <Newsletter />
      </div>
    </main>
  )
}

