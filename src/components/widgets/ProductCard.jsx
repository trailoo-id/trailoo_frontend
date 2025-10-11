"use client"

import Image from "next/image"
import Button from "@/components/common/Button"
import CategoryBadge from "@/components/common/CategoryBadge"

export default function ProductCard({ product, onLocate, colors }) {
  return (
    <div className="group rounded-xl border-2 border-gray-200 overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.02] hover:border-[#009178]/30 transition-all duration-300">
      <div className="relative h-48 lg:h-56 w-full overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={`${product.name} product image`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={product.category} />
        </div>
      </div>

      <div className="p-4 lg:p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <h3 className="text-lg lg:text-xl font-bold leading-tight text-gray-900 mb-1">
              {product.name}
            </h3>
          </div>
          <div className="text-xl lg:text-2xl font-bold" style={{ color: colors.PRIMARY }}>
            Rp {(product.price / 100).toLocaleString('id-ID')}
          </div>
        </div>

        <Button
          className="h-14 lg:h-16 text-lg lg:text-xl w-full font-semibold hover:shadow-lg active:scale-95 transition-all duration-200"
          style={{
            backgroundColor: colors.PRIMARY,
            color: colors.WHITE,
          }}
          onClick={onLocate}
        >
          Locate Product
        </Button>
      </div>
    </div>
  )
}
