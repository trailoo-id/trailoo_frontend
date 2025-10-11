"use client"

import { Plus, Minus, X } from "lucide-react"
import Image from "next/image"
import Button from "./Button"
import { COLORS } from "@/utils/constants"

/**
 * Quantity Modal Component
 * Shows when user scans a barcode that's already in the cart
 * Allows user to increase or decrease quantity
 */
export default function QuantityModal({ isOpen, product, currentQuantity, onIncrease, onDecrease, onClose }) {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-8 overflow-hidden border-4" style={{ borderColor: COLORS.PRIMARY }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#009178] to-[#007a63] p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <h2 className="text-3xl font-bold mb-2">Produk Sudah Ada di Cart</h2>
          <p className="text-lg opacity-90">Tambah atau kurangi jumlah produk?</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Product Info */}
          <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
            {/* Product Image */}
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl lg:text-4xl font-bold" style={{ color: COLORS.PRIMARY }}>
                  Rp {(product.price / 100).toLocaleString('id-ID')}
                </span>
                <span className="text-lg text-gray-500">/ {product.unit}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border-2 border-blue-300">
                <span className="text-lg font-semibold text-blue-900">
                  Qty di cart: {currentQuantity}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Decrease Button */}
            <Button
              onClick={onDecrease}
              className="h-24 lg:h-28 text-2xl lg:text-3xl font-bold rounded-2xl transition-all duration-200 active:scale-95 hover:shadow-2xl"
              style={{
                backgroundColor: currentQuantity > 1 ? '#ef4444' : '#9ca3af',
                color: 'white',
                opacity: currentQuantity > 1 ? 1 : 0.5
              }}
              disabled={currentQuantity <= 1}
            >
              <Minus className="h-10 w-10 lg:h-12 lg:w-12 mr-3" />
              Kurangi (-1)
            </Button>

            {/* Increase Button */}
            <Button
              onClick={onIncrease}
              className="h-24 lg:h-28 text-2xl lg:text-3xl font-bold rounded-2xl transition-all duration-200 active:scale-95 hover:shadow-2xl"
              style={{
                backgroundColor: '#10b981',
                color: 'white'
              }}
            >
              <Plus className="h-10 w-10 lg:h-12 lg:w-12 mr-3" />
              Tambah (+1)
            </Button>
          </div>

          {/* Cancel Button */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full h-20 lg:h-24 text-xl lg:text-2xl font-semibold rounded-2xl border-3 hover:bg-gray-100 transition-all"
            style={{
              borderColor: COLORS.NEUTRAL_DARK,
              color: COLORS.NEUTRAL_DARK
            }}
          >
            <X className="h-8 w-8 mr-3" />
            Batal
          </Button>
        </div>

        {/* Info Footer */}
        <div className="px-8 pb-8">
          <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <p className="text-base text-amber-900 text-center">
              💡 <strong>Tip:</strong> Scan barcode lagi untuk mengubah quantity, atau klik "Batal" untuk membatalkan
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
