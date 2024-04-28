import { Code, Root } from "mdast"
import { visit } from "unist-util-visit"
import { getObjectAttribute } from "./estree.js"
import { parseCode } from "./1.1.remark-list-to-section.js"
import { CodeHikeConfig } from "./config.js"

export async function transformAllCode(tree: Root, config: CodeHikeConfig) {
  if (!config?.components?.code) {
    return tree
  }

  const nodes: Code[] = []
  visit(tree, "code", (node) => {
    nodes.push(node)
  })

  await Promise.all(
    nodes.map(async (code: any) => {
      Object.assign(code, {
        type: "mdxJsxFlowElement",
        name: config?.components?.code || "Code",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "codeblock",
            value: getObjectAttribute(await parseCode(code, config)),
          },
        ],
        children: [],
      })
      delete code.value
      delete code.lang
      delete code.meta
    }),
  )

  return tree
}
