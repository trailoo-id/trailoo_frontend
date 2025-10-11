"use client"

import { CartProvider } from "@/hooks/useCart"
import { ProductsProvider } from "@/hooks/useProducts"
import { StoreMapProvider } from "@/hooks/useStoreMap"
import { NavigationProvider } from "@/hooks/useNavigation"
import { ScannerProvider } from "@/hooks/useScanner"
import { PaymentProvider } from "@/hooks/usePayment"
import { SecurityProvider } from "@/contexts/SecurityContext"

export default function AppProviders({ children }) {
  return (
    <SecurityProvider>
      <ProductsProvider>
        <StoreMapProvider>
          <CartProvider>
            <NavigationProvider>
              <ScannerProvider>
                <PaymentProvider>{children}</PaymentProvider>
              </ScannerProvider>
            </NavigationProvider>
          </CartProvider>
        </StoreMapProvider>
      </ProductsProvider>
    </SecurityProvider>
  )
}
