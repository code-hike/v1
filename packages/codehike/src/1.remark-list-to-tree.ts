import { BlockContent, Code, DefinitionContent, Heading } from "mdast"
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"

export type JSXChild = BlockContent | DefinitionContent

export type HikeTree = {
  depth: 0
  sections: RemarkSection[]
  parent?: null
  children: JSXChild[]
  code: Code[]
}

export type RemarkSection = {
  depth: number
  name: string
  query: string
  sections: RemarkSection[]
  parent: RemarkSection | HikeTree
  children: JSXChild[]
  code: Code[]
}

export function listToTree(hikeElement: MdxJsxFlowElement, prefix = "!") {
  const { children } = hikeElement

  const root: HikeTree = { depth: 0, sections: [], children: [], code: [] }
  let parent: RemarkSection["parent"] = root

  children.forEach((child) => {
    if (
      child.type === "heading" &&
      child.children[0]?.type === "text" &&
      child.children[0]?.value?.trim().startsWith(prefix)
    ) {
      while (parent.depth >= child.depth && parent.parent) {
        parent = parent.parent
      }

      const { name, query } = parseHeading(child, prefix)
      const section: RemarkSection = {
        parent,
        depth: child.depth,
        name,
        query,
        sections: [],
        children: [],
        code: [],
      }

      parent.sections.push(section)
      parent.children.push(placeholder(name))
      parent = section
    } else if (
      child.type === "heading" &&
      child.children[0]?.type === "text" &&
      child.children[0]?.value?.trim() === "/"
    ) {
      parent = parent.parent || parent
    } else if (child.type === "code" && !child.meta?.includes("!ch-exclude")) {
      parent.children.push(placeholder("code"))
      parent.code.push(child)
    } else {
      parent.children.push(child)
    }
  })

  return root
}

function placeholder(name: string) {
  return {
    type: "mdxJsxFlowElement",
    name: "slot",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "name",
        value: name,
      },
    ],
    children: [],
  } as JSXChild
}

function parseHeading(heading: Heading, prefix: string) {
  if (heading.children[0]?.type != "text") {
    throw new Error("Heading must have text")
  }
  const content = heading.children[0]?.value?.trim().slice(prefix.length)
  const name = content?.split(/\s+/)[0]
  const query = content?.slice(name.length).trim()
  return {
    name: name || "steps",
    query,
  }
}
