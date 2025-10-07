"use client"

import { MapPin } from "lucide-react"

export default function StoreGrid({ gridW, gridH, shelves, currentLocation, path, target, colors }) {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridW}, minmax(28px, 1fr))`,
          gridTemplateRows: `repeat(${gridH}, 44px)`,
          gap: 4,
          background: "#fff",
          padding: 8,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
        }}
        role="grid"
        aria-label="Store layout grid"
      >
        {Array.from({ length: gridH }).map((_, y) =>
          Array.from({ length: gridW }).map((_, x) => {
            const key = `${x},${y}`
            const isShelf = shelves.has(key)
            const isCurrent = currentLocation.x === x && currentLocation.y === y
            const isTarget = target && target.x === x && target.y === y
            const isPath = path && path.some((pt) => pt.x === x && pt.y === y) && !isCurrent && !isTarget
            return (
              <div
                key={key}
                role="gridcell"
                className="relative rounded-md"
                style={{
                  background: isShelf ? colors.SHELF : isPath ? colors.PATH : colors.FLOOR,
                  border: isTarget ? `2px solid ${colors.SUCCESS}` : "1px solid #e5e7eb",
                }}
                aria-label={`Cell ${x},${y}`}
              >
                {isCurrent && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-6 w-6 rounded-full ring-2"
                      title="Your Location"
                      style={{ background: colors.LOCATION, ringColor: "#fff" }}
                    />
                  </div>
                )}
                {isTarget && (
                  <div className="absolute right-1 top-1">
                    <MapPin className="h-4 w-4" style={{ color: colors.SUCCESS }} />
                  </div>
                )}
                {isPath && !isShelf && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ background: colors.PATH_STRONG }}
                    />
                  </div>
                )}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
