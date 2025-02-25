"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(0)

  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setMainImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Dialog>
          <DialogTrigger asChild>
            <div className="group relative cursor-zoom-in">
              <Image
                src={images[mainImage] || "/placeholder.svg"}
                alt="Product image"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-square">
              <Image
                src={images[mainImage] || "/placeholder.svg"}
                alt="Product image"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation Arrows */}
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg bg-gray-100",
              mainImage === index && "ring-2 ring-black",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

