"use client"

const categoryColors = {
  "Buah": { bg: "#dcfce7", text: "#166534", border: "#86efac" },
  "Produk Susu": { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  "Bahan Makanan": { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  "Camilan": { bg: "#fce7f3", text: "#9f1239", border: "#f9a8d4" },
  "default": { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" }
}

export default function CategoryBadge({ category }) {
  const colors = categoryColors[category] || categoryColors.default

  return (
    <span
      className="inline-flex items-center px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold border"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border
      }}
    >
      {category}
    </span>
  )
}
