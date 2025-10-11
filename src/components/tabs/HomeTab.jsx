"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SearchInput from "@/components/common/SearchInput"
import ProductGrid from "@/components/widgets/ProductGrid"
import CartSummary from "@/components/widgets/CartSummary"
import AdCarousel from "@/components/widgets/AdCarousel"
import { COLORS } from "@/utils/constants"
import { useProducts } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { useNavigation } from "@/hooks/useNavigation"

export default function HomeTab({ onLocate }) {
  const { filteredProducts, searchQuery, setSearchQuery } = useProducts()
  const { cartSubtotal, cartCount } = useCart()
  const { computeRoute, currentLocation } = useNavigation()

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3 py-4 md:py-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-3xl lg:text-4xl font-bold">
            Happy Shopping...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products (e.g., milk, apples, 8903001)"
          />
          <ProductGrid
            products={filteredProducts.slice(0, 6)}
            colors={COLORS}
            onLocate={(p) => {
              computeRoute(currentLocation, p.location)
              onLocate && onLocate(p)
            }}
          />
        </CardContent>
      </Card>

      <div className="md:col-span-1 space-y-4">
        <CartSummary
          colors={COLORS}
          count={cartCount}
          subtotal={cartSubtotal}
          onViewCart={() => (window.location.hash = "#cart")}
          onCheckout={() => (window.location.hash = "#checkout")}
        />
        <AdCarousel colors={COLORS} />
      </div>
    </section>
  )
}
