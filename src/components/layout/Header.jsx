"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LayoutPanelTop, LayoutPanelTopIcon as LayoutBottom, ChevronUp, ChevronDown } from "lucide-react"

export default function Header({ colors, navPosition, setNavPosition, autoHide, setAutoHide, navHidden }) {
  const isTop = navPosition === "top"
  const isBottom = navPosition === "bottom"
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: colors.PRIMARY }}
            aria-label="TRAILOO logo"
          >
            <ShoppingCartIcon />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-xl md:text-2xl">TRAILOO</div>
            <div className="text-xs text-gray-500">Smart Shopping Trolley</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Badge className="text-white" style={{ backgroundColor: colors.PRIMARY }}>
            Tablet Mode
          </Badge>

          <div className="flex items-center gap-1">
            <Button
              variant={isTop ? "default" : "outline"}
              size="sm"
              onClick={() => setNavPosition("top")}
              className="gap-1"
              style={isTop ? { backgroundColor: colors.PRIMARY } : {}}
              aria-pressed={isTop}
              title="Top navigation"
            >
              <LayoutPanelTop className="h-4 w-4" />
              Top
            </Button>
            <Button
              variant={isBottom ? "default" : "outline"}
              size="sm"
              onClick={() => setNavPosition("bottom")}
              className="gap-1"
              style={isBottom ? { backgroundColor: colors.PRIMARY } : {}}
              aria-pressed={isBottom}
              title="Bottom navigation"
            >
              <LayoutBottom className="h-4 w-4" />
              Bottom
            </Button>
          </div>

          <Button
            variant={autoHide ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoHide((v) => !v)}
            className="gap-1"
            style={autoHide ? { backgroundColor: colors.PRIMARY } : {}}
            aria-pressed={autoHide}
            title="Toggle auto-hide navigation"
          >
            {navHidden ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            Auto-hide
          </Button>
        </div>
      </div>
    </header>
  )
}

function ShoppingCartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" />
      <circle cx="9" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </svg>
  )
}
