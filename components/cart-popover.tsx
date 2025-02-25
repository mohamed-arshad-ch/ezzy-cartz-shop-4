"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color: string
  size: string
}

export function CartPopover() {
  // Mock cart items - replace with your actual cart state
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Cotton T-Shirt",
      price: 29.99,
      quantity: 1,
      image: "/placeholder.svg",
      color: "Black",
      size: "M",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.svg",
      color: "Blue",
      size: "L",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
            {cartItems.length}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="font-medium">Shopping Cart</h4>
          <span className="text-sm text-muted-foreground">{cartItems.length} items</span>
        </div>
        <ScrollArea className="h-[300px]">
          {cartItems.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex gap-4">
                <div className="relative aspect-square h-16 w-16 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h5 className="text-sm font-medium leading-none">{item.name}</h5>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.color} / {item.size}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="flex h-8 w-8 items-center justify-center text-sm">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 self-start">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2">
            <Button asChild className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

