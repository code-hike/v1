import { Code, Root } from "mdast"
import { visit } from "unist-util-visit"
import { getObjectAttribute } from "./estree.js"

export async function transformAllCode(
  tree: Root,
  config?: { components?: { code?: string } },
) {
  if (!config?.components?.code) {
    return tree
  }

  const nodes: Code[] = []
  visit(tree, "code", (node) => {
    nodes.push(node)
  })

  nodes.forEach((code: any) => {
    Object.assign(code, {
      type: "mdxJsxFlowElement",
      name: config?.components?.code || "Code",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "codeblock",
          value: getObjectAttribute(code),
        },
      ],
      children: [],
    })
    delete code.value
    delete code.lang
    delete code.meta
  })

  return tree
}
