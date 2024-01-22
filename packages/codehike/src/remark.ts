import { Plugin } from "unified"
// this add the jsx node types to Root
import "mdast-util-mdx-jsx"
import { Root } from "mdast"
import {
  transformAllHikes,
  transformAllRecmaHikes,
  transformAllCode,
} from "@code-hike/hike/mdx"

type Options = {}

export const remarkCodeHike: Plugin<[Options?], Root, Root> = (config) => {
  return async (root, file) => {
    let tree = (await transformAllHikes(root, config, file)) as any
    // tree = await codeTransform(tree, config as any)
    tree = await transformAllCode(tree, config as any, file)
    return tree as any
  }
}

export const recmaCodeHike: Plugin<[Options?], Root, Root> = (config) => {
  return async (root, file) => {
    let tree = transformAllRecmaHikes(root, config as any) as any
    return tree as any
  }
}
