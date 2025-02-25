"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Elevate Your Style",
    description: "Discover the latest trends in summer fashion with our new collection.",
    image: "https://images.unsplash.com/photo-1469504512102-900f29606341?w=1800&q=80",
    cta: "Shop Now",
    position: "right", // Image position
  },
  {
    id: 2,
    title: "Urban Essentials",
    subtitle: "Street Style Edit",
    description: "Contemporary urban wear for the modern lifestyle.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=80",
    cta: "Explore More",
    position: "left",
  },
  {
    id: 3,
    title: "Accessories Collection",
    subtitle: "Complete Your Look",
    description: "Curated accessories to perfect your everyday style.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80",
    cta: "View Collection",
    position: "right",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }
  }, [isAnimating])

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentSlide])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-transform duration-500 ease-in-out",
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full",
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="relative h-full">
            <div className="container mx-auto px-4 h-full">
              <div
                className={cn("flex h-full items-center", slide.position === "right" ? "justify-end" : "justify-start")}
              >
                <div className="max-w-lg backdrop-blur-sm bg-white/10 p-8 rounded-lg">
                  <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-white">
                    {slide.subtitle}
                  </span>
                  <h1 className="mb-4 text-5xl font-bold tracking-tight text-white">{slide.title}</h1>
                  <p className="mb-6 text-lg text-white/90">{slide.description}</p>
                  <Button size="lg" className="group bg-white text-black hover:bg-white/90">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentSlide ? "w-8 bg-white" : "bg-white/50 hover:bg-white/75",
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

