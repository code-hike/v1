import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "Outpost | Code Hike",
  description: "Code Hike experiments",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
