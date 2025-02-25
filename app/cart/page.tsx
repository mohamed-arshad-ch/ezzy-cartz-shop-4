"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShoppingBag, Trash2, Heart, ArrowRight, Gift, Truck, Shield } from "lucide-react"

// Mock cart items
const initialCartItems = [
  {
    id: "1",
    name: "Essential Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    color: "Black",
    size: "M",
    quantity: 1,
  },
  // ... more items
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  // Progress towards free shipping
  const freeShippingThreshold = 100
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          <div className="flex items-center gap-2 text-gray-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <Card className="backdrop-blur-sm border-0 shadow-lg mb-6">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle>Cart Items</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Free Shipping Progress */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    {subtotal < freeShippingThreshold ? (
                      <div className="space-y-2">
                        <p className="text-sm text-blue-600">
                          Add ${(freeShippingThreshold - subtotal).toFixed(2)} more to get free shipping
                        </p>
                        <Progress value={freeShippingProgress} className="h-2" />
                      </div>
                    ) : (
                      <p className="text-sm text-green-600 font-medium">
                        🎉 Congratulations! You've got free shipping!
                      </p>
                    )}
                  </div>

                  <DragDropContext onDragEnd={() => {}}>
                    <Droppable droppableId="cart">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                          {cartItems.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex gap-6 p-4 bg-white rounded-lg border transition-shadow hover:shadow-md"
                                >
                                  <div className="relative aspect-square w-24 overflow-hidden rounded-lg bg-gray-100">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h3 className="font-medium">
                                          <Link href={`/product/${item.id}`} className="hover:underline">
                                            {item.name}
                                          </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.color} / {item.size}
                                        </p>
                                      </div>
                                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                      <div className="flex items-center gap-4">
                                        <div className="flex items-center rounded-lg border">
                                          <button className="p-2 hover:bg-gray-50">-</button>
                                          <span className="w-12 text-center">{item.quantity}</span>
                                          <button className="p-2 hover:bg-gray-50">+</button>
                                        </div>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon">
                                          <Heart className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </CardContent>
              </Card>

              {/* Shopping Features */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-3">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Free Shipping</h3>
                        <p className="text-sm text-gray-500">On orders over $100</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-3">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Secure Payment</h3>
                        <p className="text-sm text-gray-500">100% secure checkout</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Gift className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Gift Cards</h3>
                        <p className="text-sm text-gray-500">Give the perfect gift</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <Card className="backdrop-blur-sm border-0 shadow-lg sticky top-24">
                <CardHeader className="border-b">
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your order details</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {/* Promo Code */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button size="lg" className="w-full bg-black text-white hover:bg-black/90 group" asChild>
                      <Link href="/checkout" className="flex items-center justify-center">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>

                    <p className="text-xs text-center text-gray-500">Shipping & taxes calculated at checkout</p>

                    {/* Payment Methods */}
                    <div className="border-t pt-4">
                      <p className="text-xs text-center text-gray-500 mb-2">We accept</p>
                      <div className="flex justify-center gap-2">
                        <img src="/visa.svg" alt="Visa" className="h-8" />
                        <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                        <img src="/amex.svg" alt="American Express" className="h-8" />
                        <img src="/paypal.svg" alt="PayPal" className="h-8" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

