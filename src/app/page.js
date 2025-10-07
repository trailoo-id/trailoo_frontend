"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import AppProviders from "@/providers/AppProviders"
import Header from "@/components/layout/Header"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"

import HomeTab from "@/components/tabs/HomeTab"
import StoreMapTab from "@/components/tabs/StoreMapTab"
import CartTab from "@/components/tabs/CartTab"
import ScannerTab from "@/components/tabs/ScannerTab"
import CheckoutTab from "@/components/tabs/CheckoutTab"

import { COLORS } from "@/utils/constants"

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")

  // Navigation UI state
  const [navPosition, setNavPosition] = useState("top") // "top" | "bottom"
  const [autoHide, setAutoHide] = useState(true)
  const [navHidden, setNavHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navHeight, setNavHeight] = useState(80)
  const isBottom = navPosition === "bottom"

  // Scroll behavior: shadow and auto-hide
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 2)
      if (!autoHide) {
        setNavHidden(false)
        lastY = y
        return
      }
      if (y > lastY + 8 && y > 120) setNavHidden(true)
      else if (y < lastY - 8) setNavHidden(false)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [autoHide])

  // Minimize navigation during checkout to prevent accidental taps
  useEffect(() => {
    setNavHidden(activeTab === "checkout")
  }, [activeTab])

  return (
    <div className="min-h-screen w-full" style={{ background: COLORS.BG, color: COLORS.TEXT, touchAction: "pan-y" }}>
      <AppProviders>
        <Header
          colors={COLORS}
          navPosition={navPosition}
          setNavPosition={setNavPosition}
          autoHide={autoHide}
          setAutoHide={setAutoHide}
          navHidden={navHidden}
        />

        <main className="mx-auto max-w-6xl px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <Navigation
              colors={COLORS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              navPosition={navPosition}
              navHidden={navHidden}
              scrolled={scrolled}
              onHeightChange={setNavHeight}
            />

            <div
              style={{
                paddingBottom: isBottom ? navHeight : 0,
                minHeight: `calc(100vh - ${isBottom ? navHeight : 0}px)`,
                transition: "padding 0.3s ease-in-out",
              }}
            >
              <TabsContent value="home">
                <HomeTab onLocate={() => setActiveTab("map")} />
              </TabsContent>

              <TabsContent value="map">
                <StoreMapTab />
              </TabsContent>

              <TabsContent value="cart">
                <CartTab onCheckout={() => setActiveTab("checkout")} />
              </TabsContent>

              <TabsContent value="scanner">
                <ScannerTab />
              </TabsContent>

              <TabsContent value="checkout">
                <CheckoutTab />
              </TabsContent>
            </div>
          </Tabs>
        </main>

        <Footer />
      </AppProviders>
    </div>
  )
}
