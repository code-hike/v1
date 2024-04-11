import type { MDXComponents } from "mdx/types"
import defaultComponents from "next-docs-ui/mdx/default"
import { BasicCode } from "./components/code/basic-code"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Code: BasicCode,
  }
}
