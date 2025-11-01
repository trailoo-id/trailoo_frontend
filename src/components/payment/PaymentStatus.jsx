"use client"

import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function PaymentStatus({ status }) {
  const cls =
    status === "paid"
      ? "border-green-200 bg-green-50"
      : status === "failed"
        ? "border-red-200 bg-red-50"
        : "border-yellow-200 bg-yellow-50"
  return (
    <div className={`flex items-center gap-2 rounded-md border p-3 ${cls}`}>
      {status === "paid" ? (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      ) : status === "failed" ? (
        <XCircle className="h-5 w-5 text-red-600" />
      ) : (
        <Loader2 className="h-5 w-5 animate-spin text-yellow-600" />
      )}
      <div className="font-medium capitalize">{status}</div>
    </div>
  )
}
