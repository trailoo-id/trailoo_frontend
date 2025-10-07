"use client"

import { Loader2 } from "lucide-react"

export default function LoadingSpinner({ label = "Loading...", size = 20 }) {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <Loader2 className="animate-spin" style={{ width: size, height: size }} />
      <span className="text-sm">{label}</span>
    </div>
  )
}
