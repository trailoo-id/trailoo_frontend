"use client"

import { ShoppingCartIcon as CartIcon, TrendingUp } from "lucide-react"
import Button from "@/components/common/Button"
import Price from "@/components/common/Price"
import { useCart } from "@/hooks/useCart"

export default function CartSummary({ colors, count, subtotal, onViewCart, onCheckout }) {
  const { cartDetailed } = useCart()

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 lg:p-6 border-b border-gray-200" style={{ backgroundColor: colors.NEUTRAL_LIGHT }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: colors.PRIMARY }}>
            <CartIcon className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold">Current Cart</h3>
            <p className="text-sm text-gray-500">{count} item{count !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div className="p-5 lg:p-6 space-y-5">
        {/* Item count with animation */}
        <div className="flex items-baseline gap-2">
          <div className="text-4xl lg:text-5xl font-bold" style={{ color: colors.PRIMARY }}>
            {count}
          </div>
          <div className="text-xl text-gray-600">item{count !== 1 ? "s" : ""}</div>
        </div>

        {/* Item previews */}
        {cartDetailed.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cartDetailed.slice(0, 3).map((item) => (
              <div key={item.id} className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg border-2 overflow-hidden" style={{ borderColor: colors.PRIMARY_LIGHT }}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {cartDetailed.length > 3 && (
              <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold">
                +{cartDetailed.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Subtotal */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg text-gray-600">Subtotal</span>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl lg:text-4xl font-bold" style={{ color: colors.PRIMARY }}>
            <Price value={subtotal} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            className="h-16 lg:h-18 text-xl lg:text-2xl flex-1 font-semibold hover:shadow-lg active:scale-95 transition-all duration-200"
            style={{ backgroundColor: colors.PRIMARY, color: 'white' }}
            onClick={onViewCart}
          >
            View Cart
          </Button>
          <Button
            className="h-16 lg:h-18 text-xl lg:text-2xl flex-1 font-semibold bg-transparent hover:bg-gray-100 active:scale-95 transition-all duration-200"
            variant="outline"
            style={{ borderColor: colors.PRIMARY, color: colors.PRIMARY, borderWidth: '2px' }}
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
