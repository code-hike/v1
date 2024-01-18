import { MdxJsxAttribute, MdxJsxExpressionAttribute } from "mdast-util-mdx-jsx"
import { JSXChild } from "./1.remark-list-to-tree.js"
import { CodeBlock, HydratedSection } from "./2.hydrate-tree.js"
import { getObjectAttribute } from "./estree.js"

export function treeToAttribute(root: HydratedSection) {
  const children: JSXChild[] = []

  const serializableTree = serializeTree(root)

  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift()!
    children.push(sectionContainer(node))
    queue.push(...node.sections)
  }

  return {
    children,
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "__hike",
        value: getObjectAttribute(serializableTree),
      } as MdxJsxAttribute,
    ],
  }
}

type SectionName = Exclude<string, "code" | "query" | "children">
type Sections = {
  [key in SectionName]: SerializableTree[]
}

type SerializableTree = Sections & {
  query: string
  children: string
  code?: CodeBlock[]
}

function serializeTree(node: HydratedSection): SerializableTree {
  const { path, query, code, sections } = node
  const result: any = {
    query,
    children: path.join("."),
  }

  if (code?.length) {
    result.code = code
  }

  sections.forEach((section) => {
    result[section.name] = result[section.name] || []
    result[section.name].push(serializeTree(section))
  })

  return result
}

function sectionContainer(section: HydratedSection): JSXChild {
  const path = section.path.join(".")
  return {
    type: "mdxJsxFlowElement",
    name: "slot",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "path",
        value: path,
      },
    ],
    children: section.children,
  }
}
