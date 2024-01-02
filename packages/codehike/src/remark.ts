import { Plugin } from "unified"
// this add the jsx node types to Root
import "mdast-util-mdx-jsx"
import { BlockContent, DefinitionContent, Root } from "mdast"
import { transformAllHikes } from "@code-hike/hike/mdx"
import { codeTransform } from "@code-hike/code/mdx"

type Options = {}

export const remarkCodeHike: Plugin<[Options?], Root, Root> = (config) => {
  return async (root, file) => {
    let tree = (await transformAllHikes(root)) as any
    tree = await codeTransform(tree, config as any)
    return tree as any
  }
}
