"use client"

import { useState } from "react"
import { Star, Share2, Heart, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
  product: {
    name: string
    price: number
    rating: number
    reviewCount: number
    description: string
    variants: {
      colors: Array<{ name: string; value: string }>
      sizes: string[]
    }
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[2])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200",
                )}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">${product.price}</span>
        <Badge variant="secondary">Free Shipping</Badge>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      {/* Color Selection */}
      <div>
        <h3 className="font-medium mb-4">Color: {selectedColor.name}</h3>
        <div className="flex flex-wrap gap-3">
          {product.variants.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "group relative h-12 w-12 rounded-full",
                selectedColor.name === color.name && "ring-2 ring-black ring-offset-2",
              )}
            >
              <span className="absolute inset-0 rounded-full" style={{ backgroundColor: color.value }} />
              {selectedColor.name === color.name && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className={cn("h-4 w-4", color.name === "White" ? "text-black" : "text-white")} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-medium mb-4">Size: {selectedSize}</h3>
        <div className="flex flex-wrap gap-3">
          {product.variants.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "h-12 w-12 rounded-md border text-sm font-medium transition-colors hover:bg-gray-50",
                selectedSize === size && "border-black bg-black text-white hover:bg-black/90",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="font-medium mb-4">Quantity</h3>
        <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button size="lg" className="flex-1 text-base" onClick={handleAddToCart} disabled={addedToCart}>
          {addedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={cn("w-14", isWishlisted && "text-red-600")}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </Button>
      </div>
    </div>
  )
}

