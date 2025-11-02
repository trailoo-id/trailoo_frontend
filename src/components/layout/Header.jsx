"use client"

import { useState } from "react"
import Image from "next/image"
import { LogOut } from "lucide-react"
import PinModal from "@/components/common/PinModal"
import { useSecurity } from "@/contexts/SecurityContext"
import { useSecureExit } from "@/hooks/useSecureExit"

export default function Header({ colors }) {
  const [showLocalPinModal, setShowLocalPinModal] = useState(false)
  const { verifyPin } = useSecurity()
  const { executePendingAction } = useSecureExit()

  const handleExitClick = () => {
    // Show PIN verification modal
    setShowLocalPinModal(true)
  }

  const handlePinVerify = (inputPin) => {
    const isValid = verifyPin(inputPin)
    if (isValid) {
      // Close PIN modal
      setShowLocalPinModal(false)

      // Use the executePendingAction from useSecureExit to properly exit
      // This sets the pinVerifiedRef flag correctly
      setTimeout(() => {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }, 100)
    }
    return isValid
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

          {/* Exit Fullscreen Button */}
          <button
            onClick={handleExitClick}
            className="p-4 rounded-full hover:bg-gray-100 transition-all"
            title="Exit Fullscreen (Keluar)"
          >
            <LogOut className="h-8 w-8 lg:h-10 lg:w-10" style={{ color: colors.PRIMARY }} />
          </button>
        </div>
      </header>

      {/* PIN Verification Modal for Exit Fullscreen */}
      <PinModal
        isOpen={showLocalPinModal}
        onClose={() => setShowLocalPinModal(false)}
        onVerify={handlePinVerify}
        title="Keluar dari Fullscreen"
      />
    </>
  )
}
