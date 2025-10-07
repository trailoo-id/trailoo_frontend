"use client"

import { formatPrice } from "@/utils/formatters"

export default function Price({ value }) {
  return <span className="font-semibold">{formatPrice(value)}</span>
}
