const { createPreset } = require("next-docs-ui/tailwind-plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ui/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./content/**/*.{md,mdx,ts,tsx,js,jsx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/next-docs-ui/dist/**/*.js",
  ],
  darkMode: "class",
  presets: [createPreset()],
}
