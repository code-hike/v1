import { Plugin } from "unified"
// this adds the jsx node types to Root
import "mdast-util-mdx-jsx"
import { Root, Content } from "mdast"

import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"

import { SKIP, visit } from "estree-util-visit"
import { getObjectAttribute } from "./estree.js"
import {
  listToSection,
  isHikeHeading,
  parseCode,
} from "./1.remark-list-to-section.js"
import { sectionToAttribute } from "./2.remark-section-to-attribute.js"
import { moveChildrenToHikeProp } from "./4.recma-move-children.js"
import { addBlocksExport } from "./5.recma-export-hike.js"

/**
 * Code Hike configuration object
 * @see [configuration documentation](https://codehike.org/docs)
 */
export type CodeHikeConfig = {
  components?: {
    code?: string
    image?: string
  }
}

export const remarkCodeHike: Plugin<[CodeHikeConfig?], Root, Root> = (
  config,
) => {
  return async (root, file) => {
    let tree = root
    // if we find any hikeable heading outside of <Hike>s,
    // let's wrap everything in a <Hike>
    if (root.children.some(isHikeHeading)) {
      tree.children = [
        {
          type: "mdxJsxFlowElement",
          name: "Hike",
          attributes: [],
          // todo what is different between RootContent and (BlockContent | DefinitionContent)
          children: tree.children as any,
        },
      ]
    }

    tree = (await transformAllHikes(root, config, file)) as any

    if (config?.components?.code) {
      tree = transformAllCode(tree, config, file) as any
    }
    return tree
  }
}

export const recmaCodeHike: Plugin<[CodeHikeConfig?], Root, Root> = (
  config,
) => {
  return async (root, file) => {
    let tree = transformAllRecmaHikes(root, config as any) as any
    return tree as any
  }
}

export async function transformAllCode(
  node: Root | Content,
  config: CodeHikeConfig,
  file?: any,
) {
  const mdxPath = file?.history
    ? file.history[file.history.length - 1]
    : undefined

  if (node.type === "code") {
    const codeblock = await parseCode(node, mdxPath)
    return {
      type: "mdxJsxFlowElement",
      name: config?.components?.code || "Code",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "codeblock",
          value: getObjectAttribute(codeblock),
        },
      ],
      children: [],
    }
  }

  if ("children" in node && node.children.length > 0) {
    // @ts-ignore
    node.children = await Promise.all(
      node.children.map((child) => transformAllCode(child, config, file)),
    )
  }

  return node
}

export async function transformAllHikes(
  node: Root | Content,
  config?: CodeHikeConfig,
  file?: any,
) {
  const mdxPath = file?.history ? file.history[file.history.length - 1] : null

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
  const section = await listToSection(node, mdxPath)
  const { children, attributes } = sectionToAttribute(section)

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

export function transformAllRecmaHikes(tree: any, config?: CodeHikeConfig) {
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

  addBlocksExport(tree)

  return tree
}

function transformRecmaHike(node: any) {
  moveChildrenToHikeProp(node)
}
