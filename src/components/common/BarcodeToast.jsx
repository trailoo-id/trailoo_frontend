"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, ShoppingCart } from "lucide-react"

/**
 * Toast Notification for Barcode Scan Feedback
 * Auto-dismisses after 2 seconds
 */
export default function BarcodeToast({ message, type = "success", isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose && onClose()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      borderColor: 'border-green-600',
      textColor: 'text-white'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500',
      borderColor: 'border-red-600',
      textColor: 'text-white'
    },
    info: {
      icon: ShoppingCart,
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-600',
      textColor: 'text-white'
    }
  }

  const { icon: Icon, bgColor, borderColor, textColor } = config[type] || config.success

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-bottom-4 duration-300">
      <div className={`${bgColor} ${textColor} px-8 py-6 rounded-2xl shadow-2xl border-4 ${borderColor} min-w-[400px] max-w-2xl`}>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Icon className="h-10 w-10 lg:h-12 lg:w-12" />
          </div>
          <div className="flex-1">
            <p className="text-xl lg:text-2xl font-bold leading-tight">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
