"use client"

import Image from "next/image"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import { QrCode } from "lucide-react"

export default function QRISPayment({ generating, qrDataUrl }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border p-4 bg-white">
      {generating ? (
        <div className="flex flex-col items-center justify-center py-8">
          <LoadingSpinner label="Generating QR..." size={32} />
        </div>
      ) : qrDataUrl ? (
        <Image
          src={qrDataUrl || "/placeholder.svg"}
          alt="QRIS Payment QR code"
          width={240}
          height={240}
          className="rounded-md"
        />
      ) : (
        <div className="flex h-60 w-full flex-col items-center justify-center text-gray-500">
          <QrCode className="h-12 w-12" />
          <div className="mt-2 text-sm">No QR generated</div>
        </div>
      )}
    </div>
  )
}
