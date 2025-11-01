"use client"

import Button from "@/components/common/Button"

export default function ReceiptGenerator({ onGenerate, disabled }) {
  return (
    <Button className="h-12 text-lg w-full bg-transparent" variant="outline" onClick={onGenerate} disabled={disabled}>
      Generate Receipt
    </Button>
  )
}
