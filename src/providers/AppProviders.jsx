"use client"

import { CartProvider } from "@/hooks/useCart"
import { ProductsProvider } from "@/hooks/useProducts"
import { StoreMapProvider } from "@/hooks/useStoreMap"
import { NavigationProvider } from "@/hooks/useNavigation"
import { ScannerProvider } from "@/hooks/useScanner"
import { PaymentProvider } from "@/hooks/usePayment"

export default function AppProviders({ children }) {
  return (
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
  )
}
