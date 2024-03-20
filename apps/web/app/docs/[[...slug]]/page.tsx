import { docs } from "@/app/source"
import type { Metadata } from "next"
import { Callout } from "next-docs-ui/components/callout"
import { RollButton } from "next-docs-ui/components/roll-button"
import { DocsPage, DocsBody } from "next-docs-ui/page"
import { notFound } from "next/navigation"
import { LayoutExample } from "./layout-example"

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = docs.getPage(params.slug)

  if (page == null) {
    notFound()
  }

  // @ts-ignore
  const { default: MDX, getBlocks } = page.data.exports
  const layout = page.data.layout

  let children = <MDX />
  if (layout === "LayoutExample") {
    children = <LayoutExample getBlocks={getBlocks} />
  }

  return (
    <DocsPage
      tableOfContent={{ enabled: false }}
      // toc={page.data.exports.toc}
    >
      <DocsBody className="min-h-screen">
        <RollButton />
        <h1>{page.data.title}</h1>
        <Callout title="Unstable API" type="warn">
          This version of Code Hike is under development. Proceed at your own
          risk.
        </Callout>

        {children}
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
