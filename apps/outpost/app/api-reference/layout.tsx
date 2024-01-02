import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-zinc-900">
      <body className={inter.className}>
        <main className="prose dark:prose-invert max-w-4xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
