import { Plugin } from "unified"
// this adds the jsx node types to Root
import "mdast-util-mdx-jsx"
import { Root } from "mdast"

import { SKIP, visit } from "estree-util-visit"

import { moveChildrenToHikeProp } from "./4.recma-move-children.js"
import { addBlocksExport } from "./5.recma-export-hike.js"
import { transformImportedCode } from "./mdx/0.import-code-from-path.js"
import { transformAllHikes } from "./mdx/1.transform-hikes.js"
import { transformAllCode } from "./mdx/2.transform-code.js"

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
    let tree = await transformImportedCode(root, file)
    tree = await transformAllHikes(tree)
    tree = await transformAllCode(tree, config)
    return tree
  }
}

export const recmaCodeHike: Plugin<[CodeHikeConfig?], Root, Root> = (
  config,
) => {
  return async (root) => {
    let tree = transformAllRecmaHikes(root, config as any) as any
    return tree as any
  }
}

function transformAllRecmaHikes(tree: any, config?: CodeHikeConfig) {
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
