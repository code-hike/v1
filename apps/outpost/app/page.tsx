import Link from "next/link"

export default function Home() {
  return (
    <main className="prose max-w-xl w-full mx-auto my-48 flex flex-col gap-8">
      <h2>Code Hike v1 demos and experiments:</h2>

      <Card href="/hike-explainer" title="Hike Explainer">
        Explains how the new <code>{`<Hike/>`}</code> component will work in
        Code Hike v1.0
      </Card>
      <Card href="/api-reference" title="API Reference">
        A clone of Stripe's API reference pages
      </Card>
    </main>
  )
}

function Card({
  href,
  title,
  children,
}: {
  href: string
  children: React.ReactNode
  title: string
}) {
  return (
    <Link
      href={href}
      className="rounded w-full block p-6 no-underline border border-zinc-300 hover:border-zinc-400 transition-colors duration-150 ease-in-out text-zinc-700 hover:text-black"
    >
      <h2 className="mt-0 text-inherit">{title}</h2>
      <p className="mb-0">{children}</p>
    </Link>
  )
}
