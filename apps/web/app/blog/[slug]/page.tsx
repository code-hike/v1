import { blog } from "@/app/source"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
  const page = blog.getPage([params.slug])

  if (page == null) {
    notFound()
  }

  const MDX = page.data.exports.default

  return (
    <main className="max-w-2xl mx-auto prose dark:prose-invert my-12">
      <h1>{page.data.title}</h1>
      <MDX />
    </main>
  )
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
