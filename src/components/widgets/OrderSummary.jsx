"use client"

import { Separator } from "@/components/ui/separator"
import Price from "@/components/common/Price"
import Button from "@/components/common/Button"

export default function OrderSummary({
  subtotal,
  taxRate = 0.07,
  onAction,
  actionLabel = "Proceed to Checkout",
  colors,
  disabled,
}) {
  const tax = subtotal * taxRate
  const total = subtotal + tax
  return (
    <div className="rounded-md border bg-white">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span>Items</span>
          <span className="font-semibold">{/* caller can include items count separately if needed */}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <Price value={subtotal} />
        </div>
        <div className="flex items-center justify-between">
          <span>Tax (10%)</span>
          <Price value={tax} />
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total</span>
          <Price value={total} />
        </div>
        {onAction && (
          <Button
            className="h-12 text-lg w-full"
            style={{ backgroundColor: colors?.PRIMARY }}
            onClick={onAction}
            disabled={disabled}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
