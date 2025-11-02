"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import AppProviders from "@/providers/AppProviders"
import Header from "@/components/layout/Header"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import PinModal from "@/components/common/PinModal"
import FullscreenPrompt from "@/components/common/FullscreenPrompt"
import QuantityModal from "@/components/common/QuantityModal"
import BarcodeToast from "@/components/common/BarcodeToast"

import HomeTab from "@/components/tabs/HomeTab"
import StoreMapTab from "@/components/tabs/StoreMapTab"
import CartTab from "@/components/tabs/CartTab"
import CheckoutTab from "@/components/tabs/CheckoutTab"

import { COLORS } from "@/utils/constants"
import { useFullscreen } from "@/hooks/useFullscreen"
import { useSecureExit } from "@/hooks/useSecureExit"
import { useSecurity } from "@/contexts/SecurityContext"
import { useGlobalBarcodeScanner } from "@/hooks/useGlobalBarcodeScanner"
import { useScanner } from "@/hooks/useScanner"
import { useCart } from "@/hooks/useCart"

function PageContent() {
  const [activeTab, setActiveTab] = useState("home")
  const { verifyPin } = useSecurity()
  const { isFullscreen, showPrompt, enterFullscreen } = useFullscreen()
  const {
    showPinModal,
    executePendingAction,
    cancelPendingAction
  } = useSecureExit()

  // Barcode Scanner Integration
  const { scannedBarcode, resetScanned } = useGlobalBarcodeScanner()
  const { scanProductByBarcode } = useScanner()
  const {
    addToCart,
    isProductInCart,
    getProductQuantity,
    incrementQuantity,
    decrementQuantity
  } = useCart()

  // Quantity Modal State
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Toast Notification State
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" })

  // Handle barcode scan from HC-655WB scanner
  useEffect(() => {
    if (scannedBarcode) {
      // Find product by barcode
      const product = scanProductByBarcode(scannedBarcode)

      if (!product) {
        // Product not found
        setToast({
          visible: true,
          message: `Barcode ${scannedBarcode} tidak ditemukan`,
          type: "error"
        })
        resetScanned()
        return
      }

      // Check if product already in cart
      if (isProductInCart(product.id)) {
        // Product exists - show quantity modal
        setSelectedProduct(product)
        setShowQuantityModal(true)
      } else {
        // Product not in cart - add automatically
        addToCart(product.id, 1)
        setToast({
          visible: true,
          message: `${product.name} ditambahkan ke cart`,
          type: "success"
        })
      }

      resetScanned()
    }
  }, [scannedBarcode, scanProductByBarcode, isProductInCart, addToCart, resetScanned])

  const handlePinVerify = (inputPin) => {
    const isValid = verifyPin(inputPin)
    if (isValid) {
      executePendingAction()
    }
    return isValid
  }

  const handleQuantityIncrease = () => {
    if (selectedProduct) {
      incrementQuantity(selectedProduct.id, 1)
      setToast({
        visible: true,
        message: `Quantity ${selectedProduct.name} ditambah`,
        type: "success"
      })
      setShowQuantityModal(false)
      setSelectedProduct(null)
    }
  }

  const handleQuantityDecrease = () => {
    if (selectedProduct) {
      decrementQuantity(selectedProduct.id, 1)
      setToast({
        visible: true,
        message: `Quantity ${selectedProduct.name} dikurangi`,
        type: "success"
      })
      setShowQuantityModal(false)
      setSelectedProduct(null)
    }
  }

  const handleQuantityModalClose = () => {
    setShowQuantityModal(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen w-full" style={{ background: COLORS.BG, color: COLORS.TEXT, touchAction: "pan-y" }}>
      {/* Hidden input for barcode scanner focus - keeps scanner active globally */}
      <input
        type="text"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
        autoFocus
        tabIndex={-1}
        onBlur={(e) => {
          // Only auto-refocus if user is NOT typing in a real input field
          const activeElement = document.activeElement
          const isUserTyping = activeElement &&
                               (activeElement.tagName === 'INPUT' ||
                                activeElement.tagName === 'TEXTAREA') &&
                               activeElement.getAttribute('aria-hidden') !== 'true'

          if (!isUserTyping) {
            setTimeout(() => e.target.focus(), 100)
          }
        }}
      />

      <Header colors={COLORS} />

      <main className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Navigation colors={COLORS} />

          <div className="px-8 lg:px-12 pb-8">
            <TabsContent value="home">
              <HomeTab
                onLocate={() => setActiveTab("map")}
                onViewCart={() => setActiveTab("cart")}
                onCheckout={() => setActiveTab("checkout")}
              />
            </TabsContent>

            <TabsContent value="map">
              <StoreMapTab />
            </TabsContent>

            <TabsContent value="cart">
              <CartTab onCheckout={() => setActiveTab("checkout")} />
            </TabsContent>

            <TabsContent value="checkout">
              <CheckoutTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <Footer />

      {/* Fullscreen prompt (shows when not in fullscreen mode) */}
      {showPrompt && !isFullscreen && (
        <FullscreenPrompt onEnterFullscreen={enterFullscreen} colors={COLORS} />
      )}

      {/* PIN Modal for secure exit */}
      <PinModal
        isOpen={showPinModal}
        onClose={cancelPendingAction}
        onVerify={handlePinVerify}
        title="Verifikasi PIN"
      />

      {/* Quantity Modal - shows when scanning existing cart item */}
      <QuantityModal
        isOpen={showQuantityModal}
        product={selectedProduct}
        currentQuantity={selectedProduct ? getProductQuantity(selectedProduct.id) : 0}
        onIncrease={handleQuantityIncrease}
        onDecrease={handleQuantityDecrease}
        onClose={handleQuantityModalClose}
      />

      {/* Toast Notification */}
      <BarcodeToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </div>
  )
}

export default function Page() {
  return (
    <AppProviders>
      <PageContent />
    </AppProviders>
  )
}
