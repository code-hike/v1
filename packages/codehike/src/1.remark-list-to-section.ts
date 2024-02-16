import { BlockContent, Code, DefinitionContent, Heading, Image } from "mdast"
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"

export type JSXChild = BlockContent | DefinitionContent

interface HikeNodeMap {
  section: HikeSection
  code: HikeCode
  image: HikeImage
  quote: HikeQuote
  content: HikeContent
}

type HikeNode = HikeNodeMap[keyof HikeNodeMap]

interface HikeNodeBase {
  name: string
  multi: boolean
  index?: number
}

export interface HikeSection extends HikeNodeBase {
  type: "section"
  query: string
  depth: number
  parent: HikeSection | null
  children: HikeNode[]
}

interface HikeCode extends HikeNodeBase {
  type: "code"
  value: string
  lang?: string | null | undefined
  meta?: string | null | undefined
  parentPath?: string
}

interface HikeImage extends HikeNodeBase {
  type: "image"
  alt: string
  title: string
  url: string
}

interface HikeQuote extends HikeNodeBase {
  type: "quote"
  value: string
}

export interface HikeContent {
  type: "content"
  value: JSXChild
}

export function listToSection(
  hikeElement: MdxJsxFlowElement,
  mdxPath?: string,
): HikeSection {
  const { children } = hikeElement

  const root: HikeSection = {
    type: "section",
    name: "",
    depth: 0,
    query: "",
    parent: null,
    children: [],
    multi: false,
  }
  let parent: HikeSection = root

  children.forEach((child) => {
    if (
      child.type === "heading" &&
      child.children[0]?.type === "text" &&
      child.children[0]?.value?.trim().startsWith("!")
    ) {
      while (parent.depth >= child.depth && parent.parent) {
        parent = parent.parent
      }

      const { name, query, multi } = parseHeading(child)
      const section: HikeSection = {
        type: "section",
        parent,
        depth: child.depth,
        name,
        query,
        multi,
        index: !multi
          ? undefined
          : parent.children.filter(
              (c) => c.type != "content" && c.name === name,
            ).length,
        children: [],
      }

      parent.children.push(section)
      parent = section
    } else if (
      child.type === "heading" &&
      child.children[0]?.type === "text" &&
      child.children[0]?.value?.trim() === "/"
    ) {
      while (parent.depth >= child.depth && parent.parent) {
        parent = parent.parent
      }
    } else if (child.type === "code" && child.meta?.trim().startsWith("!")) {
      const { name = "code", multi, query } = parseName(child.meta || "")
      parent.children.push({
        type: "code",
        name,
        multi,
        index: multi
          ? parent.children.filter(
              (c) => c.type != "content" && c.name === name,
            ).length
          : undefined,
        value: child.value,
        lang: child.lang,
        meta: query,
        parentPath: mdxPath,
      })
    } else if (
      // ![!name query](image.png)
      child.type === "paragraph" &&
      child.children.length === 1 &&
      child.children[0].type === "image" &&
      child.children[0].alt?.startsWith("!")
    ) {
      const img = child.children[0]
      const { name = "image", query, multi } = parseName(img.alt || "")

      parent.children.push({
        type: "image",
        name,
        multi,
        index: multi
          ? parent.children.filter(
              (c) => c.type != "content" && c.name === name,
            ).length
          : undefined,
        alt: query,
        title: img.title || "",
        url: img.url,
      })
    } else {
      parent.children.push({
        type: "content",
        value: child,
      })
    }
  })

  return root
}

export function isHikeHeading(child: any) {
  return (
    child.type === "heading" &&
    child.children[0]?.type === "text" &&
    child.children[0]?.value?.trim().startsWith("!")
  )
}

function parseName(value: string) {
  const multi = value.startsWith("!!")
  const content = multi ? value.slice(2) : value.slice(1)
  const name = content?.split(/\s+/)[0]
  const query = content?.slice(name.length).trim()
  return {
    name: name || undefined,
    query,
    multi,
  }
}

function parseHeading(heading: Heading) {
  if (heading.children[0]?.type != "text") {
    throw new Error("Heading must have text")
  }

  const value = heading.children[0].value.trim()
  const multi = value.startsWith("!!")
  const content = multi ? value.slice(2) : value.slice(1)
  const name = content?.split(/\s+/)[0]
  const query = content?.slice(name.length).trim()
  return {
    name: name || "steps",
    query,
    multi,
  }
}

export function parseCode(code: Code, mdxPath?: string) {
  return {
    value: code.value || "",
    lang: code.lang,
    meta: code.meta,
    parentPath: mdxPath,
  }
}
