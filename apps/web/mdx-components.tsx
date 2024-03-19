import type { MDXComponents } from "mdx/types"
import defaultComponents from "next-docs-ui/mdx/default"

import { highlight, CodeRender } from "codehike/code"
import { Line, BlockCollapse } from "@/ui/collapse"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Code,
  }
}

async function Code(props: { codeblock: any }) {
  const { codeblock } = props
  const info = await highlight(codeblock, "github-dark")
  return (
    <CodeRender
      info={info}
      components={{ Line, BlockCollapse }}
      className="py-2 !bg-zinc-900 leading-normal overflow-auto w-full whitespace-pre-wrap"
    />
  )
}
