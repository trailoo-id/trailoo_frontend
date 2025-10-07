"use client"

export default function MapLegend({ colors }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
      <LegendDot color={colors.LOCATION} label="Your Position" rounded />
      <LegendDot color={colors.SHELF} label="Shelf" />
      <LegendDot color={colors.PATH_STRONG} label="Route" />
      <div className="flex items-center gap-1">
        <span className="inline-block h-3 w-3 rounded" style={{ background: colors.SUCCESS }} />
        <span>Target</span>
      </div>
    </div>
  )
}

function LegendDot({ color, label, rounded = false }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`inline-block h-3 w-3 ${rounded ? "rounded-full" : "rounded"}`} style={{ background: color }} />
      <span>{label}</span>
    </div>
  )
}
