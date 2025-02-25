"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal, Search, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import FilterSidebar from "./filter-sidebar"

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export default function FilterBar() {
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: "category", value: "T-Shirts" },
    { id: 2, type: "price", value: "$0 - $100" },
  ])

  return (
    <div className="sticky top-0 z-10 bg-white border-b mb-8">
      <div className="container mx-auto py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search products..." className="pl-8 w-full max-w-sm" />
          </div>

          {/* Sort */}
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-gray-500">Active Filters:</span>
            {activeFilters.map((filter) => (
              <Button
                key={filter.id}
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setActiveFilters(activeFilters.filter((f) => f.id !== filter.id))
                }}
              >
                {filter.value}
                <X className="h-3 w-3 ml-1" />
              </Button>
            ))}
            <Button variant="link" size="sm" className="h-7 text-xs" onClick={() => setActiveFilters([])}>
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

