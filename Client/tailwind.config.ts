// tailwind.config.ts
import type { Config } from "tailwindcss";

// Brand palette derived from the TPAS logo (navy #12115d, red #ed1c24).
const brand = {
  50: "#f3f4fb",
  100: "#e4e6f6",
  200: "#cacdee",
  300: "#a4a9e0",
  400: "#777dcb",
  500: "#5258b5",
  600: "#3c4099",
  700: "#2d307e",
  800: "#1f2267",
  900: "#12115d",
  950: "#0b0a3b",
};

const accent = {
  50: "#fef2f2",
  100: "#fde3e4",
  200: "#fbc9cb",
  300: "#f7a1a4",
  400: "#f1676c",
  500: "#ed1c24",
  600: "#d0141b",
  700: "#ad1117",
  800: "#8f1318",
  900: "#76151a",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand,
        accent,
        // Existing pages use `teal` as their accent colour; mapping it to the
        // brand palette keeps every page on-brand without rewriting them.
        teal: brand,
        surface: "#f7f7fb",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(18, 17, 93, 0.04), 0 4px 16px rgba(18, 17, 93, 0.06)",
        lift: "0 2px 4px rgba(18, 17, 93, 0.06), 0 12px 32px rgba(18, 17, 93, 0.12)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
