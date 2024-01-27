import type { Config } from "tailwindcss"
import { createPreset } from "next-docs-ui/tailwind-plugin"

const config = {
  darkMode: "class",
  presets: [createPreset() as any],
  content: [
    "./ui/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./content/**/*.{md,mdx,ts,tsx,js,jsx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/next-docs-ui/dist/**/*.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
