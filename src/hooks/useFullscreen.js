"use client"

import { useEffect, useState, useCallback } from "react"

/**
 * Hook to manage fullscreen mode with auto-enter capability
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  const enterFullscreen = useCallback(async () => {
    try {
      const elem = document.documentElement

      if (elem.requestFullscreen) {
        await elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) { // Safari
        await elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) { // IE11
        await elem.msRequestFullscreen()
      }

      setIsFullscreen(true)
      setShowPrompt(false)
    } catch (error) {
      console.log("Fullscreen request failed:", error)
      // Show prompt if auto-fullscreen fails (needs user interaction)
      if (error.name === "NotAllowedError") {
        setShowPrompt(true)
      }
    }
  }, [])

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen()
      }

      setIsFullscreen(false)
    } catch (error) {
      console.log("Exit fullscreen failed:", error)
    }
  }, [])

  useEffect(() => {
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)

      // Show prompt if not fullscreen
      if (!isCurrentlyFullscreen) {
        setShowPrompt(true)
      } else {
        setShowPrompt(false)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    // Check initial fullscreen state and show prompt if needed
    const initialCheck = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      )

      if (!isCurrentlyFullscreen) {
        setShowPrompt(true)
      }
    }

    // Check after a short delay
    const checkTimer = setTimeout(initialCheck, 500)

    // Detect if mobile/tablet device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Try to enter fullscreen on mount with retry logic
    const attemptFullscreen = (retries = 3) => {
      if (!document.fullscreenElement && retries > 0) {
        enterFullscreen().catch(() => {
          // Retry with longer delay for mobile devices
          setTimeout(() => attemptFullscreen(retries - 1), isMobileDevice ? 2000 : 1500)
        })
      }
    }

    // First attempt after initial delay
    const timer = setTimeout(() => {
      attemptFullscreen()
    }, isMobileDevice ? 500 : 1000)

    // Additional attempt on first user interaction (for mobile)
    const handleFirstInteraction = () => {
      if (!document.fullscreenElement) {
        enterFullscreen()
      }
      // Remove listener after first attempt
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('click', handleFirstInteraction)
    }

    if (isMobileDevice) {
      document.addEventListener('touchstart', handleFirstInteraction, { once: true })
      document.addEventListener('click', handleFirstInteraction, { once: true })
    }

    return () => {
      clearTimeout(timer)
      clearTimeout(checkTimer)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('click', handleFirstInteraction)
    }
  }, [enterFullscreen])

  return {
    isFullscreen,
    showPrompt,
    enterFullscreen,
    exitFullscreen
  }
}
