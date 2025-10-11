"use client"

import ProductCard from "@/components/widgets/ProductCard"

export default function ProductGrid({ products, onLocate, colors }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} colors={colors} onLocate={() => onLocate(p)} />
      ))}
    </div>
  )
}
