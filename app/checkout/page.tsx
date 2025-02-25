"use client"

import { RadioGroupItem } from "@/components/ui/radio-group"

import { RadioGroup } from "@/components/ui/radio-group"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { AccordionContent } from "@/components/ui/accordion"

import { AccordionTrigger } from "@/components/ui/accordion"

import { AccordionItem } from "@/components/ui/accordion"

import { Accordion } from "@/components/ui/accordion"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, Truck, MapPin, ShieldCheck, Package, Mail, Printer } from "lucide-react"

const steps = [
  { id: "shipping", title: "Shipping", icon: Truck },
  { id: "payment", title: "Payment", icon: CreditCard },
  { id: "confirmation", title: "Confirmation", icon: Check },
]

const shippingMethods = [
  {
    id: "standard",
    title: "Standard Shipping",
    description: "4-5 business days",
    price: 0,
  },
  {
    id: "express",
    title: "Express Shipping",
    description: "2-3 business days",
    price: 15,
  },
  {
    id: "overnight",
    title: "Overnight Shipping",
    description: "Next business day",
    price: 25,
  },
]

// Mock cart items
const cartItems = [
  {
    id: 1,
    name: "Essential Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    color: "Black",
    size: "M",
    quantity: 1,
  },
  {
    id: 2,
    name: "Denim Jacket Classic",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
    color: "Blue",
    size: "L",
    quantity: 2,
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("shipping")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethods.find((method) => method.id === shippingMethod)?.price || 0
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    // Simulate order processing
    setOrderNumber(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`)
    setShowConfirmation(true)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between py-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                      ${
                        currentStep === step.id ? "border-black bg-black text-white" : "border-gray-300 text-gray-300"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium
                      ${currentStep === step.id ? "text-black" : "text-gray-500"}`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && <div className="w-full mx-4 h-0.5 bg-gray-200" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border p-6 backdrop-blur-sm backdrop-filter">
                {/* Shipping Address */}
                <Accordion type="single" collapsible defaultValue="shipping-address" className="w-full">
                  <AccordionItem value="shipping-address">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Shipping Address</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Enter your first name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Enter your last name" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="Enter your street address" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter your city" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="Enter your state" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input id="zipCode" placeholder="Enter your ZIP code" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="Enter your phone number" />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Shipping Method */}
                <Accordion type="single" collapsible defaultValue="shipping-method" className="w-full mt-6">
                  <AccordionItem value="shipping-method">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        <span>Shipping Method</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup defaultValue="standard" onValueChange={setShippingMethod}>
                        <div className="grid gap-4">
                          {shippingMethods.map((method) => (
                            <Label
                              key={method.id}
                              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors
                              ${shippingMethod === method.id ? "border-black bg-gray-50" : "hover:bg-gray-50"}`}
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value={method.id} id={method.id} />
                                <div>
                                  <div className="font-medium">{method.title}</div>
                                  <div className="text-sm text-gray-500">{method.description}</div>
                                </div>
                              </div>
                              <div className="font-medium">
                                {method.price === 0 ? "Free" : `$${method.price.toFixed(2)}`}
                              </div>
                            </Label>
                          ))}
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Payment */}
                <Accordion type="single" collapsible defaultValue="payment" className="w-full mt-6">
                  <AccordionItem value="payment">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Payment Method</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expMonth">Expiry Month</Label>
                            <Input id="expMonth" placeholder="MM" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expYear">Expiry Year</Label>
                            <Input id="expYear" placeholder="YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="CVC" />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-xl shadow-sm border p-6 backdrop-blur-sm backdrop-filter sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative aspect-square w-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.color} / {item.size} × {item.quantity}
                        </p>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Update the Place Order button to trigger confirmation */}
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-300 shadow-[0_0_0_3px_rgba(0,0,0,0.1)] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.2)]"
                  size="lg"
                  onClick={handlePlaceOrder}
                >
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Place Order
                </Button>

                {/* Security Note */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Order Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your order. We&apos;ll send you shipping confirmation when your order ships.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Info */}
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order number</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order date</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated delivery</span>
                  <span className="font-medium">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <h4 className="font-medium">Order Summary</h4>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative aspect-square w-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.color} / {item.size} × {item.quantity}
                    </p>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid gap-2">
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Receipt
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

