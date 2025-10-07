"use client"

import { Camera, VideoOff } from "lucide-react"
import Button from "@/components/common/Button"

export default function CameraView({ videoRef, scannerActive, onToggle, colors }) {
  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-black/80">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${scannerActive ? "" : "hidden"}`}
          muted
          playsInline
        />
        {!scannerActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <VideoOff className="h-10 w-10 opacity-70" />
            <div className="text-sm opacity-80">Camera preview disabled</div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-40 w-64 rounded-lg border-2" style={{ borderColor: colors.PRIMARY }} />
        </div>
      </div>
      <Button className="h-12 text-lg w-full" style={{ backgroundColor: colors.PRIMARY }} onClick={onToggle}>
        {scannerActive ? <VideoOff className="mr-2 h-5 w-5" /> : <Camera className="mr-2 h-5 w-5" />}
        {scannerActive ? "Stop Camera" : "Start Camera"}
      </Button>
    </div>
  )
}
