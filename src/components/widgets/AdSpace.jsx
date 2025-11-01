"use client"

import { Megaphone } from "lucide-react"

export default function AdSpace({ colors }) {
  return (
    <div
      className="rounded-md border bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
      style={{ minHeight: "220px" }}
    >
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: colors.NEUTRAL_LIGHT }}
        >
          <Megaphone className="w-8 h-8" style={{ color: colors.PRIMARY }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Advertising Space</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Your promotional content, special offers, or featured products will appear here
        </p>
      </div>
    </div>
  )
}
