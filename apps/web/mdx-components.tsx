import type { MDXComponents } from "mdx/types"
import defaultComponents from "next-docs-ui/mdx/default"
import { CodeContent } from "codehike"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Code: (props) => {
      return (
        <CodeContent
          codeblock={props.codeblock}
          config={{
            theme: "github-dark",
            annotationPrefix: "!",
            mdxPath: props.codeblock.parentPath,
          }}
          className="px-4 py-2 !bg-zinc-800/50 leading-normal overflow-auto w-full whitespace-pre-wrap"
        />
      )
    },
  }
}
