"use client"

import { useState } from "react"
import Image from "next/image"
import { Settings } from "lucide-react"
import PinModal from "@/components/common/PinModal"
import AdminSettings from "@/components/widgets/AdminSettings"
import { useSecurity } from "@/contexts/SecurityContext"

export default function Header({ colors }) {
  const [showPinVerification, setShowPinVerification] = useState(false)
  const [showAdminSettings, setShowAdminSettings] = useState(false)
  const { verifyPin } = useSecurity()

  const handleSettingsClick = () => {
    // Show PIN verification modal first
    setShowPinVerification(true)
  }

  const handlePinVerify = (inputPin) => {
    const isValid = verifyPin(inputPin)
    if (isValid) {
      // Close PIN modal and open admin settings
      setShowPinVerification(false)
      setShowAdminSettings(true)
    }
    return isValid
  }

  const handleCloseAdminSettings = () => {
    setShowAdminSettings(false)
  }

  return (
    <>
      <header className="w-full border-b bg-white shadow-sm">
        <div className="relative flex items-center justify-between px-8 lg:px-12 h-24 lg:h-28">
          {/* Logo Image - Replace with your logo file at /public/logo-trailoo.png */}
          <div className="relative ml-12 lg:ml-20" style={{ height: '250px', width: 'auto' }}>
            <Image
              src="/logo-trailoo.png"
              alt="TRAILOO Logo"
              height={140}
              width={450}
              className="h-full w-auto object-contain"
              priority
            />
          </div>

          {/* Admin Settings Button */}
          <button
            onClick={handleSettingsClick}
            className="p-4 rounded-full hover:bg-gray-100 transition-all"
            title="Admin Settings"
          >
            <Settings className="h-8 w-8 lg:h-10 lg:w-10" style={{ color: colors.PRIMARY }} />
          </button>
        </div>
      </header>

      {/* PIN Verification Modal (Step 1) */}
      <PinModal
        isOpen={showPinVerification}
        onClose={() => setShowPinVerification(false)}
        onVerify={handlePinVerify}
        title="Verifikasi Admin"
      />

      {/* Admin Settings Modal (Step 2 - after PIN verified) */}
      {showAdminSettings && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-4">
            <AdminSettings onClose={handleCloseAdminSettings} />
          </div>
        </div>
      )}
    </>
  )
}
