import { docs } from "@/app/source"
import type { Metadata } from "next"
import { RollButton } from "next-docs-ui/components/roll-button"
import { DocsPage, DocsBody } from "next-docs-ui/page"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = docs.getPage(params.slug)

  if (page == null) {
    notFound()
  }

  const MDX = page.data.exports.default

  return (
    <DocsPage
      tableOfContent={{ enabled: false }}
      // toc={page.data.exports.toc}
    >
      <DocsBody className="min-h-screen">
        <RollButton />
        <h1>{page.data.title}</h1>
        <MDX />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return docs.getPages().map((page) => ({
    slug: page.slugs,
  }))
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = docs.getPage(params.slug)

  if (page == null) notFound()

  return {
    title: page.data.title + " | Code Hike",
    description: page.data.description,
  } satisfies Metadata
}
