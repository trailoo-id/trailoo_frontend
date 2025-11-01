"use client"

import React from "react"
import { cn } from "@/lib/utils"

const variants = {
  default: "bg-[#2563eb] text-white hover:bg-[#1d4ed8] focus-visible:ring-[#2563eb] border border-transparent",
  outline: "bg-transparent text-gray-800 hover:bg-gray-50 border border-gray-300 focus-visible:ring-gray-300",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-800 border border-transparent",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 border border-transparent",
  secondary: "bg-gray-800 text-white hover:bg-black focus-visible:ring-gray-800 border border-transparent",
}

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-12 rounded-md px-6 text-lg",
  icon: "h-10 w-10",
}

function Button({ className, variant = "default", size = "default", asChild = false, ...props }, ref) {
  const Comp = asChild ? "span" : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className,
      )}
      {...props}
    />
  )
}

export default React.forwardRef(Button)
