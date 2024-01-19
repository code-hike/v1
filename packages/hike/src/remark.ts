// this adds the jsx node types to Root
import "mdast-util-mdx-jsx"
import { Root, Content } from "mdast"

import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import { listToTree } from "./1.remark-list-to-tree.js"
import { hydrateTree } from "./2.hydrate-tree.js"
import { treeToAttribute } from "./3.remark-tree-to-attribute.js"

import { SKIP, visit } from "estree-util-visit"
import { moveChildrenToHikeProp } from "./4.recma-move-children.js"

type Config = {}

export async function transformAllHikes(
  node: Root | Content,
  config?: Config,
  file?: any,
) {
  const mdxPath = file?.history
    ? file.history[file.history.length - 1]
    : undefined

  if (node.type === "mdxJsxFlowElement" && node.name === "Hike") {
    return await transformRemarkHike(node, mdxPath)
  }

  if ("children" in node && node.children.length > 0) {
    // @ts-ignore
    node.children = await Promise.all(
      node.children.map((child) => transformAllHikes(child, config, file)),
    )
  }

  return node
}

async function transformRemarkHike(node: MdxJsxFlowElement, mdxPath?: string) {
  const prefix = "!"
  const tree = listToTree(node, prefix)
  const hydratedTree = hydrateTree(tree, mdxPath)
  const { children, attributes } = treeToAttribute(hydratedTree)

  node.children = children
  node.attributes.push(...attributes)

  const asAttribute = node.attributes.find((a: any) => a.name === "as") as any
  const debug = node.attributes.find((a: any) => a.name === "debug")
  node.attributes = node.attributes.filter((a: any) => a.name !== "as")
  if (asAttribute && !debug) {
    node.name = asAttribute?.value?.value || "Hike"
  }

  return node
}

export function transformAllRecmaHikes(tree: any, config?: Config) {
  visit(tree, (node: any) => {
    if (
      node?.type === "JSXElement" &&
      node?.openingElement?.attributes?.some(
        (a: any) => a?.name?.name === "__hike",
      )
    ) {
      transformRecmaHike(node)
      return SKIP
    }
  })

  return tree
}

function transformRecmaHike(node: any) {
  moveChildrenToHikeProp(node)
}
