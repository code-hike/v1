import "./global.css"
import { RootProvider } from "next-docs-ui/provider"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { NavBar } from "../ui/nav"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
})

import ch from "codehike/package.json"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RootProvider>
          <NavBar version={ch.version} />
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  )
}
export const metadata = {
  title: "Code Hike",
  description: "Superpowered Markdown",
  alternates: {
    types: {
      "application/rss+xml": "https://v1.codehike.org/blog/feed.xml",
    },
  },
}
