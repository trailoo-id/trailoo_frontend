"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  MapIcon,
  ShoppingCartIcon as CartIcon,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function Navigation({ colors }) {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b shadow-sm mb-6" style={{ backgroundColor: colors.NEUTRAL_LIGHT, borderColor: colors.NEUTRAL_LIGHT }}>
      <div className="w-full px-8 lg:px-12">
        <TabsList className="grid w-full grid-cols-4 gap-4 lg:gap-6 p-5 lg:p-6 bg-transparent h-auto">
          <TabTrigger
            value="home"
            icon={<Home className="h-16 w-16 lg:h-20 lg:w-20" style={{ color: colors.PRIMARY }} />}
            label="Home"
          />
          <TabTrigger
            value="map"
            icon={<MapIcon className="h-16 w-16 lg:h-20 lg:w-20" style={{ color: colors.PRIMARY }} />}
            label="Map"
          />
          <TabTrigger
            value="cart"
            icon={<CartIcon className="h-16 w-16 lg:h-20 lg:w-20" style={{ color: colors.PRIMARY }} />}
            label="Cart"
            badge={cartCount}
          />
          <TabTrigger
            value="checkout"
            icon={<CreditCard className="h-16 w-16 lg:h-20 lg:w-20" style={{ color: colors.PRIMARY }} />}
            label="Pay"
          />
        </TabsList>
      </div>
    </nav>
  );
}

function TabTrigger({ value, icon, label, badge }) {
  return (
    <TabsTrigger
      value={value}
      className="relative flex flex-col items-center justify-center gap-2 lg:gap-3 rounded-lg px-5 py-4 lg:px-7 lg:py-5 text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg"
    >
      {/* Active indicator dot */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#009178] opacity-0 data-[state=active]:opacity-100 transition-opacity" />

      {/* Active bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#009178] opacity-0 rounded-t-full transition-opacity data-[state=active]:opacity-100" style={{ boxShadow: '0 -2px 8px rgba(0, 145, 120, 0.3)' }} />

      <div className="relative group-hover:scale-110 transition-transform">
        <div className="data-[state=active]:drop-shadow-[0_0_8px_rgba(0,145,120,0.6)]">
          {icon}
        </div>
        {!!badge && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 lg:min-w-[24px] lg:h-7 flex items-center justify-center rounded-full px-2 text-xs lg:text-sm font-bold text-white animate-pulse" style={{ backgroundColor: '#009178' }}>
            {badge}
          </span>
        )}
      </div>
      <span className="text-sm lg:text-base leading-tight font-semibold data-[state=active]:text-[#009178] transition-colors">{label}</span>
    </TabsTrigger>
  );
}
