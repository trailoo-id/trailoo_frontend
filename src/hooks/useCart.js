"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { useProducts } from "./useProducts"

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([
    { id: "P1001", qty: 2 },
    { id: "P3002", qty: 1 },
  ])
  const { productMap } = useProducts()

  const cartDetailed = useMemo(() => {
    return cart
      .map((c) => {
        const p = productMap.get(c.id)
        if (!p) return null
        return { ...p, qty: c.qty, lineTotal: c.qty * p.price }
      })
      .filter(Boolean)
  }, [cart, productMap])

  const cartSubtotal = useMemo(() => cartDetailed.reduce((sum, i) => sum + i.lineTotal, 0), [cartDetailed])
  const cartCount = useMemo(() => cart.reduce((sum, c) => sum + c.qty, 0), [cart])

  function addToCart(productId, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId)
      if (existing) return prev.map((c) => (c.id === productId ? { ...c, qty: c.qty + qty } : c))
      return [...prev, { id: productId, qty }]
    })
  }

  function updateQuantity(productId, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((c) => c.id !== productId)
      return prev.map((c) => (c.id === productId ? { ...c, qty } : c))
    })
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((c) => c.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  function isProductInCart(productId) {
    return cart.some((c) => c.id === productId)
  }

  function getProductQuantity(productId) {
    const item = cart.find((c) => c.id === productId)
    return item ? item.qty : 0
  }

  function incrementQuantity(productId, amount = 1) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId)
      if (existing) {
        return prev.map((c) => (c.id === productId ? { ...c, qty: c.qty + amount } : c))
      }
      return prev
    })
  }

  function decrementQuantity(productId, amount = 1) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId)
      if (!existing) return prev

      const newQty = existing.qty - amount

      if (newQty <= 0) {
        return prev.filter((c) => c.id !== productId)
      }

      return prev.map((c) => (c.id === productId ? { ...c, qty: newQty } : c))
    })
  }

  const value = {
    cart,
    cartDetailed,
    cartSubtotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isProductInCart,
    getProductQuantity,
    incrementQuantity,
    decrementQuantity
  }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
