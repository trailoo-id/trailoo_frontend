"use client"

import { createContext, useContext, useState } from "react"
import QRCode from "qrcode"
import { useCart } from "./useCart"
import { generateOrderId, generateReceiptText } from "@/utils/orderUtils"

const PaymentCtx = createContext(null)

export function PaymentProvider({ children }) {
  const [orderId, setOrderId] = useState(() => generateOrderId())
  const [paymentQR, setPaymentQR] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("pending")
  const [generatingQR, setGeneratingQR] = useState(false)

  const { cartDetailed, cartSubtotal } = useCart()

  function generatePaymentQR() {
    setGeneratingQR(true)
    const payload = JSON.stringify({
      orderId,
      amount: Number(cartSubtotal.toFixed(2)),
      currency: "USD",
      method: "QRIS",
      ts: Date.now(),
    })
    QRCode.toDataURL(payload, { width: 320, margin: 1 })
      .then((url) => {
        setPaymentQR(url)
        setGeneratingQR(false)
        setPaymentStatus("pending")
      })
      .catch(() => {
        setPaymentQR("")
        setGeneratingQR(false)
        setPaymentStatus("failed")
      })
  }

  function markAsPaid() {
    setPaymentStatus("paid")
  }

  function regenerateOrder() {
    setOrderId(generateOrderId())
    setPaymentStatus("pending")
    setPaymentQR("")
  }

  function generateReceipt() {
    const text = generateReceiptText({ orderId, cartDetailed, cartSubtotal, paymentStatus })
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `receipt-${orderId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PaymentCtx.Provider
      value={{
        orderId,
        paymentQR,
        paymentStatus,
        generatingQR,
        generatePaymentQR,
        regenerateOrder,
        markAsPaid,
        generateReceipt,
      }}
    >
      {children}
    </PaymentCtx.Provider>
  )
}

export function usePayment() {
  const ctx = useContext(PaymentCtx)
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider")
  return ctx
}
