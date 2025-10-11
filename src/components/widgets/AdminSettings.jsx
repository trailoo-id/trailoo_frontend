"use client"

import { useState } from "react"
import { Settings, Lock, Eye, EyeOff, CheckCircle, XCircle, Shield } from "lucide-react"
import Button from "@/components/common/Button"
import { useSecurity } from "@/contexts/SecurityContext"
import { COLORS } from "@/utils/constants"

/**
 * Admin Settings Component
 * Allows admin to change PIN and toggle security lock
 */
export default function AdminSettings({ onClose }) {
  const { exitPin, isLocked, verifyPin, updatePin, toggleLock } = useSecurity()
  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [showPins, setShowPins] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChangPin = () => {
    setError("")
    setSuccess("")

    // Validate current PIN
    if (!verifyPin(currentPin)) {
      setError("PIN saat ini salah")
      return
    }

    // Validate new PIN
    if (newPin.length < 4) {
      setError("PIN baru harus minimal 4 digit")
      return
    }

    if (!/^\d+$/.test(newPin)) {
      setError("PIN hanya boleh berisi angka")
      return
    }

    // Validate confirmation
    if (newPin !== confirmPin) {
      setError("Konfirmasi PIN tidak cocok")
      return
    }

    // Update PIN
    const updated = updatePin(newPin)
    if (updated) {
      setSuccess("PIN berhasil diubah!")
      setCurrentPin("")
      setNewPin("")
      setConfirmPin("")
      setTimeout(() => setSuccess(""), 3000)
    } else {
      setError("Gagal mengubah PIN")
    }
  }

  const handleToggleLock = () => {
    toggleLock(!isLocked)
  }

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200" style={{ backgroundColor: COLORS.NEUTRAL_LIGHT }}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: COLORS.PRIMARY }}>
            <Settings className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Admin Settings</h2>
            <p className="text-sm text-gray-600">Kelola keamanan aplikasi</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Security Lock Toggle */}
        <div className="p-5 rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Shield className={`h-7 w-7 ${isLocked ? 'text-green-600' : 'text-gray-400'}`} />
              <div>
                <h3 className="text-lg font-bold">Security Lock</h3>
                <p className="text-sm text-gray-600">
                  {isLocked ? "Proteksi PIN aktif" : "Proteksi PIN nonaktif"}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleLock}
              className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
                isLocked ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                  isLocked ? 'translate-x-11' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-500 pl-10">
            {isLocked
              ? "User perlu memasukkan PIN untuk keluar dari aplikasi atau fullscreen"
              : "User dapat keluar tanpa verifikasi PIN"}
          </p>
        </div>

        {/* Change PIN Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6" style={{ color: COLORS.PRIMARY }} />
            <h3 className="text-xl font-bold">Ubah PIN</h3>
          </div>

          {/* Current PIN */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              PIN Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPins ? "text" : "password"}
                inputMode="numeric"
                value={currentPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setCurrentPin(value)
                  setError("")
                }}
                placeholder="Masukkan PIN saat ini"
                className="w-full h-14 px-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:border-[#009178] focus:outline-none focus:ring-2 focus:ring-[#009178]/20 transition-all"
              />
            </div>
          </div>

          {/* New PIN */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              PIN Baru (minimal 4 digit)
            </label>
            <div className="relative">
              <input
                type={showPins ? "text" : "password"}
                inputMode="numeric"
                value={newPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setNewPin(value)
                  setError("")
                }}
                placeholder="Masukkan PIN baru"
                className="w-full h-14 px-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:border-[#009178] focus:outline-none focus:ring-2 focus:ring-[#009178]/20 transition-all"
              />
            </div>
          </div>

          {/* Confirm PIN */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Konfirmasi PIN Baru
            </label>
            <div className="relative">
              <input
                type={showPins ? "text" : "password"}
                inputMode="numeric"
                value={confirmPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setConfirmPin(value)
                  setError("")
                }}
                placeholder="Konfirmasi PIN baru"
                className="w-full h-14 px-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:border-[#009178] focus:outline-none focus:ring-2 focus:ring-[#009178]/20 transition-all"
              />
            </div>
          </div>

          {/* Show/Hide PINs Toggle */}
          <button
            onClick={() => setShowPins(!showPins)}
            className="flex items-center gap-2 text-base font-medium transition-colors"
            style={{ color: COLORS.PRIMARY }}
          >
            {showPins ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            {showPins ? "Sembunyikan PIN" : "Tampilkan PIN"}
          </button>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <p className="text-base font-semibold text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <p className="text-base font-semibold text-green-700">{success}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleChangPin}
              disabled={!currentPin || !newPin || !confirmPin}
              className="flex-1 h-16 text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.PRIMARY, color: 'white' }}
            >
              Ubah PIN
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                className="h-16 px-8 text-xl font-semibold border-2 hover:bg-gray-100"
                style={{ borderColor: '#6b7280', color: '#374151' }}
              >
                Tutup
              </Button>
            )}
          </div>

          {/* Current PIN Info */}
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Info:</strong> PIN default adalah <code className="font-mono font-bold">1234</code>.
              Disarankan untuk mengubahnya demi keamanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
