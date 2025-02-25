"use client"

import { useState } from "react"
import { Star, ThumbsUp, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ProductTabsProps {
  product: {
    details: {
      material: string
      care: string
      fit: string
      origin: string
    }
    features: string[]
    reviews: Array<{
      id: number
      author: string
      rating: number
      date: string
      title: string
      content: string
      verified: boolean
      helpful: number
      images?: string[]
    }>
  }
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ]

  const ratingCounts = {
    5: 86,
    4: 24,
    3: 12,
    2: 4,
    1: 2,
  }

  const totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0)

  return (
    <div>
      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "border-b-2 py-4 text-sm font-medium transition-colors hover:text-gray-900",
                activeTab === tab.id ? "border-black text-black" : "border-transparent text-gray-600",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "details" && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Material</dt>
                  <dd className="text-gray-600">{product.details.material}</dd>
                </div>
                <div>
                  <dt className="font-medium">Care Instructions</dt>
                  <dd className="text-gray-600">{product.details.care}</dd>
                </div>
                <div>
                  <dt className="font-medium">Fit</dt>
                  <dd className="text-gray-600">{product.details.fit}</dd>
                </div>
                <div>
                  <dt className="font-medium">Origin</dt>
                  <dd className="text-gray-600">{product.details.origin}</dd>
                </div>
              </dl>
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
                alt="Product details"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div>
            <h3 className="text-lg font-medium mb-4">Key Features</h3>
            <ul className="grid gap-4 md:grid-cols-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1 rounded-full bg-green-500 p-1">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid gap-8 md:grid-cols-12">
            {/* Rating Summary */}
            <div className="md:col-span-4">
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {Object.entries(ratingCounts)
                  .reverse()
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="flex w-28 items-center gap-2">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress value={(count / totalReviews) * 100} className="flex-1" />
                      <div className="w-12 text-right text-sm text-gray-600">
                        {Math.round((count / totalReviews) * 100)}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Review List */}
            <div className="md:col-span-8">
              <div className="space-y-8">
                {product.reviews.map((review) => (
                  <div key={review.id} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author}</span>
                          {review.verified && <Badge variant="secondary">Verified Purchase</Badge>}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200",
                                )}
                              />
                            ))}
                          </div>
                          <span>·</span>
                          <time>{review.date}</time>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium">{review.title}</h4>
                      <p className="mt-2 text-gray-600">{review.content}</p>
                    </div>
                    {review.images && (
                      <div className="flex gap-4">
                        {review.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square w-20 overflow-hidden rounded-lg bg-gray-100"
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Review image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

