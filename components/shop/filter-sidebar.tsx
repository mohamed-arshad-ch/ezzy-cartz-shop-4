"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"

const categories = [
  { id: "t-shirts", label: "T-Shirts", count: 120 },
  { id: "jackets", label: "Jackets", count: 45 },
  { id: "dresses", label: "Dresses", count: 85 },
  { id: "shoes", label: "Shoes", count: 65 },
  { id: "hoodies", label: "Hoodies", count: 35 },
  { id: "jeans", label: "Jeans", count: 55 },
  { id: "bags", label: "Bags", count: 25 },
]

const brands = [
  { id: "essential", label: "Essential", count: 45 },
  { id: "denim-co", label: "Denim Co", count: 32 },
  { id: "summer-vibes", label: "Summer Vibes", count: 28 },
  { id: "urban-style", label: "UrbanStyle", count: 36 },
  { id: "premium-basics", label: "Premium Basics", count: 24 },
]

const ratings = [5, 4, 3, 2, 1]

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <span className="text-sm">{category.label}</span>
              <span className="text-sm text-gray-500 ml-auto">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 500]}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center space-x-2">
              <Checkbox id={brand.id} />
              <span className="text-sm">{brand.label}</span>
              <span className="text-sm text-gray-500 ml-auto">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <div className="flex items-center">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-500">& Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

