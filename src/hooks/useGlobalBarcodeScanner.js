"use client"

import { useEffect, useState, useCallback, useRef } from "react"

/**
 * Global Barcode Scanner Hook
 * Listens to keyboard events globally to detect barcode scanner input (HC-655WB)
 * Works with USB OTG or Bluetooth on Android tablets
 *
 * Scanner works as "virtual keyboard" - sends keystrokes very fast (< 50ms)
 * followed by Enter key
 *
 * @returns {Object} { scannedBarcode, resetScanned }
 */
export function useGlobalBarcodeScanner() {
  const [scannedBarcode, setScannedBarcode] = useState(null)
  const barcodeBufferRef = useRef('')
  const lastKeyTimeRef = useRef(Date.now())
  const scanTimeoutRef = useRef(null)

  const resetScanned = useCallback(() => {
    setScannedBarcode(null)
  }, [])

  useEffect(() => {
    const SCANNER_KEY_THRESHOLD = 200 // ms - scanner types faster than this
    const AUTO_SCAN_TIMEOUT = 100 // ms - auto-scan if no more keys come (scanner done)
    const MANUAL_RESET_TIMEOUT = 2000 // ms - reset buffer if user stopped typing manually

    const handleKeyDown = (e) => {
      const currentTime = Date.now()
      const timeDiff = currentTime - lastKeyTimeRef.current

      // Clear existing timeout
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }

      // If time between keys is too long, reset buffer (human typing)
      if (timeDiff > SCANNER_KEY_THRESHOLD && barcodeBufferRef.current.length > 0) {
        barcodeBufferRef.current = ''
      }

      // Handle Enter key - barcode scan complete
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (barcodeBufferRef.current.length > 0) {
          e.preventDefault()
          e.stopPropagation()

          // Emit scanned barcode
          const barcode = barcodeBufferRef.current.trim()
          setScannedBarcode(barcode)

          // Reset buffer
          barcodeBufferRef.current = ''
        }
        lastKeyTimeRef.current = currentTime
        return
      }

      // Accumulate alphanumeric characters only
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        barcodeBufferRef.current += e.key

        // Set timeout to auto-scan if scanner is done (no Enter sent)
        scanTimeoutRef.current = setTimeout(() => {
          if (barcodeBufferRef.current.length > 0) {
            const barcode = barcodeBufferRef.current.trim()

            // If buffer has reasonable barcode length (8-20 chars), auto-scan
            if (barcode.length >= 8 && barcode.length <= 20) {
              setScannedBarcode(barcode)
              barcodeBufferRef.current = ''
            } else {
              // Too short/long, likely manual typing, wait longer before reset
              setTimeout(() => {
                if (barcodeBufferRef.current === barcode) {
                  barcodeBufferRef.current = ''
                }
              }, MANUAL_RESET_TIMEOUT)
            }
          }
        }, AUTO_SCAN_TIMEOUT)
      }

      lastKeyTimeRef.current = currentTime
    }

    // Attach global listener with capture phase (catches events before they reach target)
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }
    }
  }, [])

  return {
    scannedBarcode,
    resetScanned
  }
}
