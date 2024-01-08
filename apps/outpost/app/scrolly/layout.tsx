import { Metadata } from "next"
import { Inter } from "next/font/google"
import "./styles.css"

export const metadata: Metadata = {
  title: "Hike Explainer | Code Hike",
  description: "Code Hike experiments",
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="dark bg-zinc-900 mb-[100vh] snap-mandatory snap-y"
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
