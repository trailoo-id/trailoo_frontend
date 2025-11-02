"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Button from "@/components/common/Button"
import SearchInput from "@/components/common/SearchInput"
import Price from "@/components/common/Price"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Navigation } from "lucide-react"
import { useProducts } from "@/hooks/useProducts"
import { useNavigation } from "@/hooks/useNavigation"

export default function NavigationPanel({ colors }) {
  const { products, setSelectedProduct } = useProducts()
  const { selectedProductId, setSelectedProductId, computeRoute, currentLocation, isRouting, path } = useNavigation()
  const [localSearchQuery, setLocalSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    const q = localSearchQuery.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.barcode.includes(q),
    )
  }, [products, localSearchQuery])

  return (
    <div className="space-y-3 relative z-20">
      <SearchInput value={localSearchQuery} onChange={(e) => setLocalSearchQuery(e.target.value)} placeholder="Find a product" />

      <div className="max-h-[240px] overflow-auto rounded-md border">
        {filteredProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedProduct(p)
              setSelectedProductId(p.id)
              computeRoute(currentLocation, p.location)
            }}
            className={`flex w-full items-center gap-3 p-3 text-left hover:bg-gray-50 ${
              selectedProductId === p.id ? "bg-blue-50" : ""
            }`}
            aria-label={`Select ${p.name} for navigation`}
          >
            <Image
              src={p.image || "/placeholder.svg"}
              alt={`${p.name} thumbnail`}
              width={48}
              height={48}
              className="h-12 w-12 rounded object-cover"
            />
            <div className="flex-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-500">
                {p.category} • Row {p.location.y}, Col {p.location.x}
              </div>
            </div>
            <Price value={p.price} />
          </button>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          className="h-12 text-lg flex-1"
          style={{ backgroundColor: colors.PRIMARY }}
          onClick={() => {
            const p = filteredProducts.find((fp) => fp.id === selectedProductId)
            if (p) computeRoute(currentLocation, p.location)
          }}
          disabled={!selectedProductId || isRouting}
        >
          {isRouting ? <LoadingSpinner label="Routing..." /> : <Navigation className="mr-2 h-5 w-5" />}
          {!isRouting && "Plan Route"}
        </Button>
        <Button
          className="h-12 text-lg flex-1 bg-transparent"
          variant="outline"
          onClick={() => {
            // Start navigation without scrolling
          }}
          disabled={!path?.length}
        >
          Start
        </Button>
      </div>
    </div>
  )
}
