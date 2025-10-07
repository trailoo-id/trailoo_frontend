"use client"

import { createContext, useContext, useState } from "react"
import { useStoreMap } from "./useStoreMap"
import { bfsRoute } from "@/utils/pathfinding"

const NavigationCtx = createContext(null)

export function NavigationProvider({ children }) {
  const { GRID_W, GRID_H, shelves } = useStoreMap()
  const [currentLocation, setCurrentLocation] = useState({ x: 1, y: 7 })
  const [path, setPath] = useState([])
  const [isRouting, setIsRouting] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  function computeRoute(start, target) {
    setIsRouting(true)
    setTimeout(() => {
      const route = bfsRoute(start, target, GRID_W, GRID_H, shelves)
      setPath(route)
      setIsRouting(false)
    }, 200)
  }

  function moveToTarget() {
    if (!path?.length) return
    setIsRouting(true)
    let i = 0
    const timer = setInterval(() => {
      if (i >= path.length) {
        clearInterval(timer)
        setIsRouting(false)
        return
      }
      setCurrentLocation(path[i])
      i++
    }, 200)
  }

  const value = {
    currentLocation,
    setCurrentLocation,
    path,
    setPath,
    isRouting,
    computeRoute,
    moveToTarget,
    selectedProductId,
    setSelectedProductId,
  }

  return <NavigationCtx.Provider value={value}>{children}</NavigationCtx.Provider>
}

export function useNavigation() {
  const ctx = useContext(NavigationCtx)
  if (!ctx) throw new Error("useNavigation must be used within NavigationProvider")
  return ctx
}
