"use client"

import { ShoppingCartIcon as CartIcon } from "lucide-react"
import Price from "@/components/common/Price"
import Button from "@/components/common/Button"

export default function CartSummary({ colors, count, subtotal, onViewCart, onCheckout }) {
  return (
    <div className="rounded-md border bg-white">
      <div className="p-4 border-b">
        <div className="text-xl flex items-center gap-2 font-semibold">
          <CartIcon className="h-5 w-5" /> Current Cart
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="text-3xl font-bold">
          {count} item{count !== 1 ? "s" : ""}
        </div>
        <div className="text-gray-500">Subtotal</div>
        <div className="text-2xl">
          <Price value={subtotal} />
        </div>
        <div className="flex gap-2 pt-2">
          <Button className="h-12 text-lg flex-1" style={{ backgroundColor: colors.PRIMARY }} onClick={onViewCart}>
            View Cart
          </Button>
          <Button className="h-12 text-lg flex-1 bg-transparent" variant="outline" onClick={onCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
