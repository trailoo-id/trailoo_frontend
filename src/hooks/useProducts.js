"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { INITIAL_PRODUCTS } from "@/utils/constants"

const ProductsCtx = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.barcode.includes(q),
    )
  }, [products, searchQuery])

  const productMap = useMemo(() => {
    const map = new Map()
    products.forEach((p) => map.set(p.id, p))
    return map
  }, [products])

  const value = {
    products,
    productMap,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedProduct,
    setSelectedProduct,
  }

  return <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsCtx)
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider")
  return ctx
}
