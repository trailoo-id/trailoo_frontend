"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StoreGrid from "@/components/map/StoreGrid"
import NavigationPanel from "@/components/map/NavigationPanel"
import MapLegend from "@/components/map/MapLegend"
import { useStoreMap } from "@/hooks/useStoreMap"
import { useNavigation } from "@/hooks/useNavigation"
import { useProducts } from "@/hooks/useProducts"
import { COLORS } from "@/utils/constants"

export default function StoreMapTab() {
  const { GRID_W, GRID_H, shelves } = useStoreMap()
  const { currentLocation, path } = useNavigation()
  const { selectedProduct } = useProducts()

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 md:py-6">
      <Card className="md:col-span-2 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Store Map</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreGrid
            gridW={GRID_W}
            gridH={GRID_H}
            shelves={shelves}
            currentLocation={currentLocation}
            path={path}
            target={selectedProduct?.location}
            colors={COLORS}
          />
          <MapLegend colors={COLORS} />
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl">Navigate to Product</CardTitle>
        </CardHeader>
        <CardContent>
          <NavigationPanel colors={COLORS} />
        </CardContent>
      </Card>
    </section>
  )
}
