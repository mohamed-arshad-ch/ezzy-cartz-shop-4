"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            ULTRAS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm hover:text-gray-600">
              Home
            </Link>
            <Link href="/shop" className="text-sm hover:text-gray-600">
              Shop
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-xs text-white flex items-center justify-center">
                    2
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] p-0" align="end">
                <div className="flex flex-col max-h-[calc(100vh-8rem)]">
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <h4 className="font-medium">Shopping Cart</h4>
                    <span className="text-sm text-muted-foreground">2 items</span>
                  </div>

                  <ScrollArea className="h-[300px]">
                    <div className="flex flex-col gap-3 p-4">
                      {/* Example Cart Item */}
                      <div className="group relative flex items-center gap-4">
                        <div className="relative aspect-square h-[80px] w-[80px] overflow-hidden rounded-lg bg-muted">
                          <Image
                            src="/placeholder.svg"
                            alt="Product"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <h5 className="font-medium leading-none group-hover:underline">Cotton T-Shirt</h5>
                          <p className="text-sm text-muted-foreground">Black / M</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button className="rounded-md bg-muted px-2 py-0.5 text-sm hover:bg-muted/80">−</button>
                              <span className="text-sm tabular-nums">1</span>
                              <button className="rounded-md bg-muted px-2 py-0.5 text-sm hover:bg-muted/80">+</button>
                            </div>
                            <p className="font-medium">$29.99</p>
                          </div>
                        </div>
                        <button className="absolute -right-2 -top-2 hidden rounded-full bg-red-100 p-1 text-red-600 opacity-0 transition-opacity hover:bg-red-200 group-hover:opacity-100 md:block">
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Second Example Item */}
                      <div className="group relative flex items-center gap-4">
                        <div className="relative aspect-square h-[80px] w-[80px] overflow-hidden rounded-lg bg-muted">
                          <Image
                            src="/placeholder.svg"
                            alt="Product"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <h5 className="font-medium leading-none group-hover:underline">Denim Jacket</h5>
                          <p className="text-sm text-muted-foreground">Blue / L</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button className="rounded-md bg-muted px-2 py-0.5 text-sm hover:bg-muted/80">−</button>
                              <span className="text-sm tabular-nums">1</span>
                              <button className="rounded-md bg-muted px-2 py-0.5 text-sm hover:bg-muted/80">+</button>
                            </div>
                            <p className="font-medium">$89.99</p>
                          </div>
                        </div>
                        <button className="absolute -right-2 -top-2 hidden rounded-full bg-red-100 p-1 text-red-600 opacity-0 transition-opacity hover:bg-red-200 group-hover:opacity-100 md:block">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <div className="flex items-center justify-between py-2 text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">$119.98</span>
                    </div>
                    <div className="flex items-center justify-between py-2 text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">$119.98</span>
                    </div>
                    <div className="mt-4 grid gap-2">
                      <Button asChild className="w-full bg-black text-white hover:bg-black/90">
                        <Link href="/checkout">Checkout</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/cart">View Cart</Link>
                      </Button>
                    </div>
                    <p className="mt-4 text-center text-xs text-muted-foreground">Free shipping on orders over $100</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-sm hover:text-gray-600">
                Home
              </Link>
              <Link href="/shop" className="text-sm hover:text-gray-600">
                Shop
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

