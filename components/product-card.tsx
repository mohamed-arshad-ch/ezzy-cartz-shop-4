"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact"
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsInCart(!isInCart)
  }

  if (variant === "compact") {
    return (
      <Link href={`/product/${product.id}`} className="group relative">
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-black text-white">New</Badge>}
            {product.discount && <Badge className="bg-red-600 text-white">-{product.discount}%</Badge>}
          </div>
          {/* Quick actions */}
          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add to wishlist</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* Add to cart overlay */}
          <div className="absolute inset-0 flex items-end opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              className="w-full rounded-none bg-black py-3 text-white hover:bg-black/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <h3 className="truncate text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`} className="group relative">
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-black text-white">New</Badge>}
          {product.discount && <Badge className="bg-red-600 text-white">-{product.discount}%</Badge>}
        </div>
        {/* Quick actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
                  onClick={handleWishlist}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add to wishlist</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Add to cart overlay */}
        <div className="absolute inset-0 flex items-end opacity-0 transition-opacity group-hover:opacity-100">
          <Button className="w-full rounded-none bg-black py-3 text-white hover:bg-black/90" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          {product.rating && <span className="text-xs text-gray-500">({product.rating})</span>}
        </div>
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
        {product.colors && (
          <div className="flex gap-1">
            {product.colors.map((color) => (
              <div
                key={color}
                className="h-3 w-3 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

