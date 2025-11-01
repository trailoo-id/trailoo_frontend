export function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase()
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `TR-${ts}-${rnd}`
}

export function generateReceiptText({ orderId, cartDetailed, cartSubtotal, paymentStatus }) {
  const lines = []
  lines.push("TRAILOO Smart Shopping Trolley")
  lines.push("Receipt")
  lines.push("=".repeat(32))
  lines.push(`Order ID: ${orderId}`)
  lines.push(`Date: ${new Date().toLocaleString()}`)
  lines.push("")
  cartDetailed.forEach((item) => {
    lines.push(`${item.name} x${item.qty} @ $${item.price.toFixed(2)}`)
    lines.push(`  = $${item.lineTotal.toFixed(2)}`)
  })
  lines.push("-".repeat(32))
  lines.push(`Subtotal: $${cartSubtotal.toFixed(2)}`)
  const tax = cartSubtotal * 0.07
  const total = cartSubtotal + tax
  lines.push(`Tax (7%): $${tax.toFixed(2)}`)
  lines.push(`TOTAL: $${total.toFixed(2)}`)
  lines.push("")
  lines.push(`Payment Method: QRIS`)
  lines.push(`Payment Status: ${paymentStatus.toUpperCase()}`)
  lines.push("")
  lines.push("Thank you for shopping with TRAILOO!")
  return lines.join("\n")
}
