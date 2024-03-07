import type { MDXComponents } from "mdx/types"
import defaultComponents from "next-docs-ui/mdx/default"
import { CodeContent } from "codehike"
import { Line, Collapse } from "@/ui/collapse"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Code,
  }
}

function Code(props: { codeblock: any }) {
  return (
    <CodeContent
      codeblock={props.codeblock}
      config={{
        theme: "github-dark",
        annotationPrefix: "!",
        mdxPath: props.codeblock.parentPath,
      }}
      components={{ Line, Collapse }}
      className="py-2 !bg-zinc-900 leading-normal overflow-auto w-full whitespace-pre-wrap"
    />
  )
}
