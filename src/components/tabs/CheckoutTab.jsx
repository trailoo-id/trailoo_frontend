"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Price from "@/components/common/Price";
import { Separator } from "@/components/ui/separator";
import Button from "@/components/common/Button";
import QRISPayment from "@/components/payment/QRISPayment";
import PaymentStatus from "@/components/payment/PaymentStatus";
import ReceiptGenerator from "@/components/payment/ReceiptGenerator";
import { useCart } from "@/hooks/useCart";
import { usePayment } from "@/hooks/usePayment";
import { COLORS } from "@/utils/constants";

export default function CheckoutTab() {
  const { cartDetailed, cartSubtotal } = useCart();
  const {
    orderId,
    paymentQR,
    paymentStatus,
    generatingQR,
    generatePaymentQR,
    regenerateOrder,
    markAsPaid,
    generateReceipt,
  } = usePayment();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 md:py-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl">Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <div className="flex items-center justify-between p-3 md:p-4">
              <div className="font-semibold">Order ID</div>
              <div className="font-mono text-sm">{orderId}</div>
            </div>
            <Separator />
            {cartDetailed.length === 0 ? (
              <div className="p-4 text-gray-500">
                Tidak ada item di pesanan.
              </div>
            ) : (
              cartDetailed.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 md:p-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.name} thumbnail`}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        x{item.qty} @ <Price value={item.price} />
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold">
                    <Price value={item.lineTotal} />
                  </div>
                </div>
              ))
            )}
            <Separator />
            <div className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <Price value={cartSubtotal} />
              </div>
              <div className="flex items-center justify-between">
                <span>Pajak (7%)</span>
                <Price value={cartSubtotal * 0.07} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xl font-bold">
                <span>Total</span>
                <Price value={cartSubtotal * 1.07} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              className="h-12 text-lg bg-transparent"
              variant="outline"
              onClick={regenerateOrder}
            >
              New Order ID
            </Button>
            <Button
              className="h-12 text-lg bg-transparent"
              variant="outline"
              onClick={generatePaymentQR}
              disabled={generatingQR}
            >
              Generate Payment QR
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl">QRIS Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QRISPayment generating={generatingQR} qrDataUrl={paymentQR} />
          <PaymentStatus status={paymentStatus} />
          <div className="flex flex-col gap-2">
            <Button
              className="h-12 text-lg w-full"
              style={{ backgroundColor: COLORS.SUCCESS }}
              onClick={markAsPaid}
              disabled={!paymentQR || paymentStatus === "paid"}
            >
              Tandai Sudah Dibayar
            </Button>
            <ReceiptGenerator
              onGenerate={generateReceipt}
              disabled={cartDetailed.length === 0}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
