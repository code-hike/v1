import { blog } from "@/app/source"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function Page({ params }: { params: { slug: string } }) {
  const page = blog.getPage([params.slug])

  if (page == null) {
    notFound()
  }

  const MDX = page.data.exports.default

  return (
    <main className="max-w-2xl mx-auto prose dark:prose-invert my-12">
      <div className="flex items-end justify-between mb-8">
        <span>
          {page.data.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <Author name={page.data.authors[0]} />
      </div>
      <h1>{page.data.title}</h1>
      <MDX />
    </main>
  )
}

import pomber from "./pomber.jpg"
import Link from "next/link"

function Author({ name }: { name: string }) {
  if (name === "pomber") {
    return (
      <Link
        className="inline-flex items-center gap-2 no-underline hover:bg-primary/10 rounded not-prose p-2 -m-2"
        href="https://twitter.com/pomber"
      >
        <Image
          src={pomber}
          alt="pomber"
          width={32}
          height={32}
          priority={true}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold text-sm">Rodrigo Pombo</div>
          <div className="text-primary/60 text-sm">@pomber</div>
        </div>
      </Link>
    )
  }
  return null
}

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = blog.getPage([params.slug])

  if (page == null) notFound()

  return {
    title: page.data.title + " | Code Hike",
    description: page.data.description,
  } satisfies Metadata
}
