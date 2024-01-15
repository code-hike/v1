import { Metadata } from "next"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Test | Code Hike",
  description: "Code Hike experiments",
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-zinc-900">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
