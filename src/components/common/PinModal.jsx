"use client"

import { useState, useRef, useEffect } from "react"
import { Lock, X, AlertTriangle } from "lucide-react"
import Button from "./Button"

/**
 * PIN Modal for security verification
 * Used to confirm fullscreen exit or browser close
 */
export default function PinModal({ isOpen, onClose, onVerify, title = "Verifikasi PIN" }) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const inputRefs = useRef([])

  const MAX_ATTEMPTS = 3
  const PIN_LENGTH = 4

  useEffect(() => {
    if (isOpen) {
      setPin("")
      setError("")
      // Focus first input when modal opens
      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    }
  }, [isOpen])

  const handlePinChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newPin = pin.split("")
    newPin[index] = value

    const updatedPin = newPin.join("")
    setPin(updatedPin)
    setError("")

    // Auto-focus next input
    if (value && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when PIN is complete
    if (updatedPin.length === PIN_LENGTH) {
      setTimeout(() => handleVerify(updatedPin), 100)
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = (pinToVerify = pin) => {
    if (pinToVerify.length !== PIN_LENGTH) {
      setError("PIN harus 4 digit")
      return
    }

    const isValid = onVerify(pinToVerify)

    if (isValid) {
      setPin("")
      setError("")
      setAttempts(0)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(`PIN salah (${newAttempts}/${MAX_ATTEMPTS})`)
      setPin("")

      // Clear all inputs
      inputRefs.current.forEach(input => {
        if (input) input.value = ""
      })

      // Focus first input again
      inputRefs.current[0]?.focus()

      // Lock after max attempts
      if (newAttempts >= MAX_ATTEMPTS) {
        setError("Terlalu banyak percobaan gagal. Hubungi admin.")
        setTimeout(() => {
          setAttempts(0)
          setError("")
        }, 5000)
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, PIN_LENGTH)

    if (!/^\d+$/.test(pastedData)) return

    setPin(pastedData)

    // Fill inputs
    pastedData.split("").forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit
      }
    })

    // Auto-verify if complete
    if (pastedData.length === PIN_LENGTH) {
      setTimeout(() => handleVerify(pastedData), 100)
    }
  }

  if (!isOpen) return null

  const isMaxAttemptsReached = attempts >= MAX_ATTEMPTS

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border-4 border-[#009178]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#009178] to-[#007a63] p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Lock className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
          </div>
          <p className="text-sm opacity-90">Masukkan PIN untuk melanjutkan</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Warning message */}
          <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">Area Terkunci</p>
              <p>Untuk keamanan, masukkan PIN yang benar untuk keluar dari aplikasi atau fullscreen mode.</p>
            </div>
          </div>

          {/* PIN Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-4 text-center">
              Masukkan PIN (4 Digit)
            </label>
            <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
              {[...Array(PIN_LENGTH)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-16 h-20 text-center text-3xl font-bold border-3 border-gray-300 rounded-xl focus:border-[#009178] focus:outline-none focus:ring-4 focus:ring-[#009178]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={pin[index] || ""}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isMaxAttemptsReached}
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <div className="text-center">
                <p className={`text-base font-semibold ${isMaxAttemptsReached ? 'text-red-600' : 'text-red-500'}`}>
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center text-sm text-gray-500 mb-6">
            <p>PIN Default: <span className="font-mono font-semibold">1234</span></p>
            <p className="mt-1">Hubungi admin untuk mengubah PIN</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-gray-100"
              style={{ borderColor: '#6b7280', color: '#374151' }}
            >
              Batal
            </Button>
            <Button
              onClick={() => handleVerify()}
              disabled={pin.length !== PIN_LENGTH || isMaxAttemptsReached}
              className="flex-1 h-14 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#009178', color: 'white' }}
            >
              Verifikasi
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
