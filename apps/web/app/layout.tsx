import "./global.css"
import { RootProvider } from "next-docs-ui/provider"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { NavBar } from "../ui/nav"

const inter = Inter({
  subsets: ["latin"],
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RootProvider>
          <NavBar />
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
export const metadata = {
  title: "Code Hike",
  description: "Superpowered Markdown",
}
