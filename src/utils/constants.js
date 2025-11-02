export const COLORS = {
  // Primary Teal
  PRIMARY: "#009178",
  PRIMARY_DARK: "#007a63",
  PRIMARY_LIGHT: "#4ec9b0",

  // Accent Blue
  ACCENT: "#0A3A66",
  ACCENT_LIGHT: "#3A6FA5",

  // Neutrals
  NEUTRAL_DARK: "#1E1E1E",
  NEUTRAL_LIGHT: "#F4F7F6",
  WHITE: "#FFFFFF",

  // Legacy (for backward compatibility)
  SUCCESS: "#009178",
  BG: "#FFFFFF",
  TEXT: "#1E1E1E",
  MUTED: "#6b7280",
  SHELF: "#9ca3af",
  FLOOR: "#e5e7eb",
  PATH: "rgba(0, 145, 120, 0.22)",
  PATH_STRONG: "rgba(0, 145, 120, 0.6)",
  LOCATION: "#f59e0b",
};

export const GRID_W = 12;
export const GRID_H = 8;

// Sample product data
export const INITIAL_PRODUCTS = [
  {
    id: "P1001",
    name: "Apel Organik",
    price: 29900,
    image: "/organic-apples-in-basket.png",
    category: "Buah",
    barcode: "8901001",
    location: { x: 9, y: 2 },
  },
  {
    id: "P1002",
    name: "Pisang Satu Sisir",
    price: 14900,
    image: "/bananas-bunch.png",
    category: "Buah",
    barcode: "8999908920706",
    location: { x: 10, y: 2 },
  },
  {
    id: "P2001",
    name: "Susu Sapi 1L",
    price: 19900,
    image: "/milk-carton.png",
    category: "Produk Susu",
    barcode: "8902001",
    location: { x: 3, y: 4 },
  },
  {
    id: "P3002",
    name: "Saus Tomat",
    price: 25900,
    image: "/tomato-sauce-jar.png",
    category: "Bahan Makanan",
    barcode: "8903002",
    location: { x: 8, y: 6 },
  },
  {
    id: "P4001",
    name: "Keripik Kentang",
    price: 39900,
    image: "/potato-chips-bag.png",
    category: "Camilan",
    barcode: "8904001",
    location: { x: 2, y: 2 },
  },
  {
    id: "P5001",
    name: "Cokelat Hitam",
    price: 29900,
    image: "/dark-chocolate-bar.png",
    category: "Camilan",
    barcode: "8905001",
    location: { x: 5, y: 2 },
  },
  {
    id: "P6001",
    name: "Produk Test Scanner",
    price: 15000,
    image: "/test-product.png",
    category: "Bahan Makanan",
    barcode: "8999777007058",
    location: { x: 6, y: 4 },
    unit: "pcs"
  },
  {
    id: "P7001",
    name: "CAT AIR",
    price: 12500,
    image: "/watercolor-paint.jpeg",
    category: "Alat Tulis",
    barcode: "9789792797121",
    location: { x: 2, y: 4 },
  },
  {
    id: "P7002",
    name: "STB GRAND FYi2TV",
    price: 450000,
    image: "/set-top-box.jpeg",
    category: "Elektronik",
    barcode: "4710423651760",
    location: { x: 9, y: 6 },
  },
  {
    id: "P7003",
    name: "AMPLOP PAPERLINE BKLT PTH ISI",
    price: 8500,
    image: "/envelope-paperline.jpeg",
    category: "Alat Tulis",
    barcode: "8991389247013",
    location: { x: 3, y: 4 },
  },
];
