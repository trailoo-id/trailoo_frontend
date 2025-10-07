"use client"

import Image from "next/image"
import Price from "@/components/common/Price"

export default function RecentScans({ scans, productMap }) {
  if (!scans?.length) return <div className="rounded-md border p-4 text-gray-500">No recent scans.</div>
  return (
    <div className="space-y-2">
      {scans.map((s, idx) => {
        const p = productMap.get(s.id)
        if (!p) return null
        return (
          <div key={`${s.id}-${idx}`} className="flex items-center gap-3 rounded-md border p-2">
            <Image
              src={p.image || "/placeholder.svg"}
              alt={`${p.name} thumbnail`}
              width={40}
              height={40}
              className="h-10 w-10 rounded object-cover"
            />
            <div className="flex-1">
              <div className="font-medium leading-tight">{p.name}</div>
              <div className="text-xs text-gray-500">{new Date(s.time).toLocaleTimeString()}</div>
            </div>
            <Price value={p.price} />
          </div>
        )
      })}
    </div>
  )
}
