"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useSecurity } from "@/contexts/SecurityContext"

/**
 * Hook to handle secure exit with PIN verification
 * Prevents browser close and fullscreen exit without PIN
 */
export function useSecureExit() {
  const { isLocked } = useSecurity()
  const [showPinModal, setShowPinModal] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const pinVerifiedRef = useRef(false)

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

  // Intercept fullscreen exit and require PIN
  useEffect(() => {
    if (!isLocked) return

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      )

      // If user is exiting fullscreen without PIN verification
      if (!isCurrentlyFullscreen && !pinVerifiedRef.current) {
        // Re-enter fullscreen immediately and show PIN modal
        setPendingAction("exitFullscreen")
        setShowPinModal(true)

        // Try to re-enter fullscreen
        setTimeout(() => {
          const elem = document.documentElement
          if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {})
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen()
          }
        }, 100)
      }

      // Reset PIN verified flag after successful exit
      if (!isCurrentlyFullscreen && pinVerifiedRef.current) {
        pinVerifiedRef.current = false
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
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
      // Set flag to allow exit
      pinVerifiedRef.current = true

      // Exit fullscreen
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
