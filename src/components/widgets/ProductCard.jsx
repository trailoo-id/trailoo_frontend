"use client"

import Image from "next/image"
import Button from "@/components/common/Button"
import Price from "@/components/common/Price"

export default function ProductCard({ product, onAdd, onLocate, colors }) {
  return (
    <div className="rounded-md border overflow-hidden bg-white">
      <div className="relative h-32 md:h-40 w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={`${product.name} product image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-semibold leading-tight">{product.name}</div>
            <div className="text-sm text-gray-500">{product.category}</div>
          </div>
          <Price value={product.price} />
        </div>
        <div className="mt-3 flex gap-2">
          <Button className="h-12 text-lg flex-1" style={{ backgroundColor: colors.PRIMARY }} onClick={onAdd}>
            Add
          </Button>
          <Button className="h-12 text-lg flex-1 bg-transparent" variant="outline" onClick={onLocate}>
            Locate
          </Button>
        </div>
      </div>
    </div>
  )
}
