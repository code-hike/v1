import { Card, Cards } from "next-docs-ui/mdx/card"
import Link from "next/link"
import { AllSponsors, PoweredBy, TopSponsors } from "./landing/sponsors"

export default function HomePage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white pt-28  max-w-2xl mx-auto">
        Superpowered
        <br /> Markdown
      </h1>
      <h2 className="mt-6 text-xl text-primary/80 text-center max-w-3xl mx-auto  pb-16">
        The authoring experience of Markdown meets the dynamic versatility of
        React
      </h2>

      <div className="flex w-full justify-center gap-4 pb-16">
        <ButtonLink href="docs" className="w-32">
          Docs
        </ButtonLink>
        <ButtonLink href="play" className="w-32">
          Playground
        </ButtonLink>
      </div>

      <TopSponsors className="mb-24" />

      <div className="w-full h-96 bg-primary/10 flex justify-center items-center md:rounded-lg  mb-16 text-primary/60">
        Code Hike Visualization
      </div>

      <div className="w-full mb-16">
        <ButtonLink
          href="docs/components/scrollycoding"
          className="mx-auto w-36 block"
        >
          See it in action
        </ButtonLink>
      </div>

      <AllSponsors className="mb-24" />

      <PoweredBy className="mb-8 text-center flex items-center justify-center gap-4 w-full flex-wrap" />
    </main>
  )
}

function ButtonLink({
  href,
  children,
  className,
}: {
  className?: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={
        "border border-primary/50 rounded p-2 text-center hover:border-primary transition-colors " +
        className
      }
    >
      {children}
    </Link>
  )
}
