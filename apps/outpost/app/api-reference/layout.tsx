import { Metadata } from "next"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "API Reference Example | Code Hike",
  description: "Code Hike experiments",
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-zinc-900 mb-96">
      <body className={inter.className}>
        <main className="prose prose-zinc dark:prose-invert max-w-4xl mx-auto mt-24">
          {children}
        </main>
      </body>
    </html>
  )
}
