"use client"

import { createContext, useContext, useState, useCallback } from "react"

const SecurityContext = createContext(null)

/**
 * Security Provider to manage PIN-based exit prevention
 * Default PIN: 1234 (can be changed via admin settings)
 */
export function SecurityProvider({ children }) {
  const [exitPin, setExitPin] = useState("1234") 
  const [isLocked, setIsLocked] = useState(true) // Lock by default

  const verifyPin = useCallback((inputPin) => {
    return inputPin === exitPin
  }, [exitPin])

  const updatePin = useCallback((newPin) => {
    if (newPin && newPin.length >= 4) {
      setExitPin(newPin)
      return true
    }
    return false
  }, [])

  const toggleLock = useCallback((enabled) => {
    setIsLocked(enabled)
  }, [])

  return (
    <SecurityContext.Provider value={{
      exitPin,
      isLocked,
      verifyPin,
      updatePin,
      toggleLock
    }}>
      {children}
    </SecurityContext.Provider>
  )
}

export function useSecurity() {
  const context = useContext(SecurityContext)
  if (!context) {
    throw new Error("useSecurity must be used within SecurityProvider")
  }
  return context
}
