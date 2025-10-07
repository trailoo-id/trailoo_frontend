"use client"

import { createContext, useContext, useMemo } from "react"
import { GRID_W, GRID_H } from "@/utils/constants"

const StoreMapCtx = createContext(null)

export function StoreMapProvider({ children }) {
  const shelves = useMemo(() => {
    const blocks = []
    for (let x = 1; x < GRID_W - 1; x++) {
      blocks.push(`${x},1`)
      blocks.push(`${x},3`)
      blocks.push(`${x},5`)
    }
    blocks.push(`1,6`)
    blocks.push(`10,6`)
    return new Set(blocks)
  }, [])

  return <StoreMapCtx.Provider value={{ GRID_W, GRID_H, shelves }}>{children}</StoreMapCtx.Provider>
}

export function useStoreMap() {
  const ctx = useContext(StoreMapCtx)
  if (!ctx) throw new Error("useStoreMap must be used within StoreMapProvider")
  return ctx
}
