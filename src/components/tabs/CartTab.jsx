"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/common/Button"
import Price from "@/components/common/Price"
import OrderSummary from "@/components/widgets/OrderSummary"
import { useCart } from "@/hooks/useCart"
import { COLORS } from "@/utils/constants"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartTab({ onCheckout }) {
  const { cartDetailed, cartSubtotal, cartCount, addToCart, updateQuantity, removeFromCart } = useCart()

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 md:py-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl">Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cartDetailed.length === 0 ? (
            <div className="rounded-md border p-6 text-center text-gray-500">
              Your cart is empty. Add items or scan.
            </div>
          ) : (
            cartDetailed.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-md border p-3 md:p-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.name} image`}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.category}</div>
                  <div className="mt-1">
                    <Price value={item.price} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 bg-transparent"
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <div className="min-w-[3ch] text-center text-lg font-semibold">{item.qty}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 bg-transparent"
                    onClick={() => addToCart(item.id, 1)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="w-24 text-right">
                  <div className="text-sm text-gray-500">Total</div>
                  <Price value={item.lineTotal} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="md:col-span-1">
        <OrderSummary
          subtotal={cartSubtotal}
          colors={COLORS}
          onAction={onCheckout}
          actionLabel="Proceed to Checkout"
          disabled={cartDetailed.length === 0}
        />
      </div>
    </section>
  )
}
