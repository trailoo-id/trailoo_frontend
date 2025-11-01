"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useProducts } from "./useProducts"
import { useCart } from "./useCart"

const ScannerCtx = createContext(null)

export function ScannerProvider({ children }) {
  const [scannerActive, setScannerActive] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [recentScans, setRecentScans] = useState([])
  const [manualCode, setManualCode] = useState("")
  const videoRef = useRef(null)
  const mediaRef = useRef(null)

  const { products } = useProducts()
  const { addToCart } = useCart()

  useEffect(() => {
    async function startVideo() {
      if (!videoRef.current) return
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        })
        mediaRef.current = stream
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      } catch (e) {
        console.warn("Camera unavailable:", e)
      }
    }

    if (scannerActive) startVideo()
    else stopCamera()

    return () => stopCamera()
  }, [scannerActive])

  function stopCamera() {
    if (mediaRef.current) {
      mediaRef.current.getTracks().forEach((t) => t.stop())
      mediaRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
  }

  function toggleCamera() {
    setScannerActive((v) => !v)
  }

  function scanProduct(callback) {
    // Jika input kosong, hentikan proses
    if (!manualCode.trim()) {
      return
    }

    setScanning(true)
    setTimeout(() => {
      const p = products.find((prod) => prod.barcode === manualCode.trim())

      if (p) {
        addToCart(p.id, 1)
        setRecentScans((prev) => [
          { time: new Date().toISOString(), id: p.id },
          ...prev,
        ].slice(0, 6))

        // Callback with success status
        if (callback) {
          callback({ success: true, product: p })
        }
      } else {
        // Callback with failure status
        if (callback) {
          callback({ success: false, barcode: manualCode.trim() })
        }
      }

      setManualCode("")
      setScanning(false)
    }, 800)
  }

  function scanProductByBarcode(barcode, callback) {
    // Scan product by barcode directly (for global scanner)
    if (!barcode || !barcode.trim()) {
      if (callback) callback({ success: false, barcode })
      return
    }

    const p = products.find((prod) => prod.barcode === barcode.trim())

    if (p) {
      setRecentScans((prev) => [
        { time: new Date().toISOString(), id: p.id },
        ...prev,
      ].slice(0, 6))

      // Return product info, let caller decide whether to add to cart
      if (callback) {
        callback({ success: true, product: p })
      }

      return p
    } else {
      if (callback) {
        callback({ success: false, barcode: barcode.trim() })
      }
      return null
    }
  }

  const value = {
    videoRef,
    scannerActive,
    toggleCamera,
    scanning,
    manualCode,
    setManualCode,
    scanProduct,
    scanProductByBarcode,
    recentScans,
  }

  return <ScannerCtx.Provider value={value}>{children}</ScannerCtx.Provider>
}

export function useScanner() {
  const ctx = useContext(ScannerCtx)
  if (!ctx) throw new Error("useScanner must be used within ScannerProvider")
  return ctx
}
