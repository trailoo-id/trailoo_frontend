"use client"

import { Maximize } from "lucide-react"
import Button from "./Button"

/**
 * Prompt to enter fullscreen mode
 * Shows when auto-fullscreen fails (needs user interaction)
 */
export default function FullscreenPrompt({ onEnterFullscreen, colors }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-white rounded-2xl shadow-2xl border-3 p-6 flex items-center gap-4" style={{ borderColor: colors.PRIMARY }}>
        <div className="p-3 rounded-full" style={{ backgroundColor: colors.PRIMARY }}>
          <Maximize className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Mode Fullscreen</h3>
          <p className="text-sm text-gray-600">Klik untuk mengaktifkan fullscreen</p>
        </div>
        <Button
          onClick={onEnterFullscreen}
          className="h-14 px-8 text-lg font-semibold whitespace-nowrap"
          style={{ backgroundColor: colors.PRIMARY, color: 'white' }}
        >
          Aktifkan
        </Button>
      </div>
    </div>
  )
}
