"use client"

import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import { BarcodeIcon } from "lucide-react"

export default function BarcodeInput({ manualCode, setManualCode, onScan, scanning }) {
  return (
    <div className="flex items-center gap-2">
      <Input
        className="h-12 text-lg"
        placeholder="Enter product code manually (e.g., 8903001)"
        value={manualCode}
        onChange={(e) => setManualCode(e.target.value)}
      />
      <Button className="h-12 text-lg" onClick={onScan} disabled={!manualCode || scanning}>
        {scanning ? (
          <LoadingSpinner label="Scanning..." />
        ) : (
          <>
            <BarcodeIcon className="mr-2 h-5 w-5" />
            Add
          </>
        )}
      </Button>
    </div>
  )
}
