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
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    // Try to enter fullscreen on mount after delay
    const timer = setTimeout(() => {
      if (!document.fullscreenElement) {
        enterFullscreen()
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [enterFullscreen])

  return {
    isFullscreen,
    showPrompt,
    enterFullscreen,
    exitFullscreen
  }
}
