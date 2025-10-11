"use client"

import { useEffect, useState, useCallback } from "react"
import { useSecurity } from "@/contexts/SecurityContext"

/**
 * Hook to handle secure exit with PIN verification
 * Prevents browser close and fullscreen exit without PIN
 */
export function useSecureExit() {
  const { isLocked } = useSecurity()
  const [showPinModal, setShowPinModal] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)

  // Prevent browser close/refresh
  useEffect(() => {
    if (!isLocked) return

    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = "Masukkan PIN untuk keluar dari TRAILOO"
      return e.returnValue
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isLocked])

  // Handle fullscreen exit with PIN
  const requestExitFullscreen = useCallback(() => {
    if (!isLocked) {
      // Exit directly if not locked
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      return
    }

    // Show PIN modal for verification
    setPendingAction("exitFullscreen")
    setShowPinModal(true)
  }, [isLocked])

  const executePendingAction = useCallback(() => {
    if (pendingAction === "exitFullscreen") {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }

    setPendingAction(null)
    setShowPinModal(false)
  }, [pendingAction])

  const cancelPendingAction = useCallback(() => {
    setPendingAction(null)
    setShowPinModal(false)
  }, [])

  return {
    showPinModal,
    requestExitFullscreen,
    executePendingAction,
    cancelPendingAction
  }
}
