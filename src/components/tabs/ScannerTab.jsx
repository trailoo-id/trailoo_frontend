"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CameraView from "@/components/scanner/CameraView";
import BarcodeInput from "@/components/scanner/BarcodeInput";
import RecentScans from "@/components/scanner/RecentScans";
import Button from "@/components/common/Button";
import { BarcodeIcon, AlertCircle } from "lucide-react";
import { useScanner } from "@/hooks/useScanner";
import { useProducts } from "@/hooks/useProducts";
import { COLORS } from "@/utils/constants";

export default function ScannerTab() {
  const {
    videoRef,
    scannerActive,
    toggleCamera,
    scanning,
    manualCode,
    setManualCode,
    scanProduct,
    recentScans,
  } = useScanner();
  const { productMap } = useProducts();

  const [showAlert, setShowAlert] = useState(false);

  const handleScan = () => {
    const hasCode = manualCode.trim() !== "";
    if (!hasCode) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    scanProduct();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 md:py-6">
      <Card className="md:col-span-2 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Barcode Scanner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAlert && (
            <Alert variant="destructive" className="border-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Scan gagal</AlertTitle>
              <AlertDescription>
                Mohon masukkan kode barcode terlebih dahulu sebelum melakukan
                scan.
              </AlertDescription>
            </Alert>
          )}

          <CameraView
            videoRef={videoRef}
            scannerActive={scannerActive}
            onToggle={toggleCamera}
            colors={COLORS}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              className="h-12 text-lg flex-1 bg-transparent"
              variant="outline"
              onClick={handleScan}
              disabled={scanning}
            >
              <BarcodeIcon className="mr-2 h-5 w-5" />
              Scan Product
            </Button>
          </div>
          <BarcodeInput
            manualCode={manualCode}
            setManualCode={setManualCode}
            onScan={handleScan}
            scanning={scanning}
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl">Recently Scanned</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentScans scans={recentScans} productMap={productMap} />
        </CardContent>
      </Card>
    </section>
  );
}
