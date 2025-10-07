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

  function scanProduct() {
    // Jika input kosong, hentikan proses
    if (!manualCode.trim()) {
      console.warn("Kode barcode kosong — tidak ada produk yang discan.")
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
      } else {
        console.warn(`Produk dengan barcode ${manualCode.trim()} tidak ditemukan.`)
      }

      setManualCode("")
      setScanning(false)
    }, 800)
  }

  const value = {
    videoRef,
    scannerActive,
    toggleCamera,
    scanning,
    manualCode,
    setManualCode,
    scanProduct,
    recentScans,
  }

  return <ScannerCtx.Provider value={value}>{children}</ScannerCtx.Provider>
}

export function useScanner() {
  const ctx = useContext(ScannerCtx)
  if (!ctx) throw new Error("useScanner must be used within ScannerProvider")
  return ctx
}
