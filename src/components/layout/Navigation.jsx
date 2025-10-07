"use client";

import { useEffect, useRef } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  MapIcon,
  ShoppingCartIcon as CartIcon,
  BarcodeIcon,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function Navigation({
  colors,
  activeTab,
  setActiveTab,
  navPosition = "top",
  navHidden = false,
  scrolled = false,
  onHeightChange,
}) {
  const { cartCount } = useCart();
  const isTop = navPosition === "top";
  const navRef = useRef(null);

  useEffect(() => {
    function measure() {
      if (!navRef.current) return;
      const h = Math.round(navRef.current.getBoundingClientRect().height);
      if (onHeightChange) onHeightChange(h || 80);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [onHeightChange]);

  // classes for container position + hide/show state
  const posClass = isTop
    ? "sticky top-0 left-0 right-0"
    : "fixed left-1/2 -translate-x-1/2 w-[94%] sm:w-[86%] md:w-[66%] lg:w-[52%]";

  const safeBottom = isTop
    ? ""
    : "bottom-[calc(env(safe-area-inset-bottom,1rem)+0.6rem)]";

  const hiddenTransform = isTop ? "-translate-y-[120%]" : "translate-y-[110%]";
  const visibleTransform = "translate-y-0";

  const visibilityClass = navHidden
    ? `${hiddenTransform} opacity-0 pointer-events-none`
    : `${visibleTransform} opacity-100 pointer-events-auto`;

  return (
    <div
      ref={navRef}
      role="navigation"
      aria-hidden={navHidden}
      className={[
        "z-50 transition-transform transition-opacity duration-300 ease-in-out",
        posClass,
        safeBottom,
        visibilityClass,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ willChange: "transform, opacity" }}
    >
      <nav
        className={[
          "mx-auto rounded-2xl border border-gray-200",
          "backdrop-blur-md bg-white/70 shadow-lg",
          isTop ? "border-b" : "",
        ].join(" ")}
        aria-label="Primary"
      >
        <TabsList className="grid w-full grid-cols-5 gap-1 p-2 md:p-3 rounded-2xl">
          <TabTrigger
            value="home"
            icon={
              <Home className="h-5 w-5" style={{ color: colors.PRIMARY }} />
            }
            label="Home"
          />
          <TabTrigger
            value="map"
            icon={
              <MapIcon className="h-5 w-5" style={{ color: colors.PRIMARY }} />
            }
            label="Store Map"
          />
          <TabTrigger
            value="cart"
            icon={
              <CartIcon className="h-5 w-5" style={{ color: colors.PRIMARY }} />
            }
            label="Cart"
            badge={cartCount}
          />
          <TabTrigger
            value="scanner"
            icon={
              <BarcodeIcon
                className="h-5 w-5"
                style={{ color: colors.PRIMARY }}
              />
            }
            label="Scanner"
          />
          <TabTrigger
            value="checkout"
            icon={
              <CreditCard
                className="h-5 w-5"
                style={{ color: colors.PRIMARY }}
              />
            }
            label="Checkout"
          />
        </TabsList>
      </nav>
    </div>
  );
}

function TabTrigger({ value, icon, label, badge }) {
  return (
    <TabsTrigger
      value={value}
      className="relative flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-md sm:text-sm md:py-3"
    >
      <div className="relative">
        {icon}
        {!!badge && (
          <span className="absolute -top-2 -right-2 min-w-[18px] leading-none rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-semibold text-white text-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[11px] leading-[1]">{label}</span>
    </TabsTrigger>
  );
}
