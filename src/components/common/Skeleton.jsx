"use client"

export default function Skeleton({ className = "", variant = "rectangular" }) {
  const baseClass = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"

  const variantClass = {
    rectangular: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4"
  }[variant] || "rounded-md"

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      style={{
        animation: 'shimmer 2s infinite linear',
      }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-gray-200 overflow-hidden bg-white p-4 lg:p-5">
      <Skeleton className="h-48 lg:h-56 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
      <Skeleton className="h-4 w-1/2 mb-4" variant="text" />
      <Skeleton className="h-14 lg:h-16 w-full" />
    </div>
  )
}

// Add shimmer animation to global CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `
  document.head.appendChild(style)
}
