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
  _data: {
    header: string
  }
  type: "section"
  title: string
  depth: number
  parent: HikeSection | null
  children: HikeNode[]
}

interface HikeCode extends HikeNodeBase {
  type: "code"
  value: string
  lang?: string | null | undefined
  meta?: string | null | undefined
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

const DEFAULT_BLOCKS_NAME = "blocks"
const DEFAULT_CODE_NAME = "code"
const DEFAULT_IMAGES_NAME = "image"
const DEFAULT_VALUE_NAME = "value"

export async function listToSection(
  hikeElement: MdxJsxFlowElement,
): Promise<HikeSection> {
  const { children } = hikeElement

  const root: HikeSection = {
    type: "section",
    _data: {
      header: "",
    },
    name: "",
    depth: 0,
    title: "",
    parent: null,
    children: [],
    multi: false,
  }
  let parent: HikeSection = root

  for (const child of children) {
    if (
      child.type === "heading" &&
      child.children[0]?.type === "text" &&
      child.children[0]?.value?.trim().startsWith("!")
    ) {
      while (parent.depth >= child.depth && parent.parent) {
        parent = parent.parent
      }

      const { name, title, multi } = parseHeading(child)
      const section: HikeSection = {
        type: "section",
        _data: {
          header: "#".repeat(child.depth) + " " + child.children[0].value,
        },
        parent,
        depth: child.depth,
        name,
        title,
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
    } else if (isHikeCode(child)) {
      const {
        name = DEFAULT_CODE_NAME,
        multi,
        title,
      } = parseName(child.meta || "")
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
        meta: title,
        // parentPath: mdxPath,
      })
    } else if (
      // ![!name title](image.png)
      isHikeImage(child)
    ) {
      const img = child.children[0]
      const {
        name = DEFAULT_IMAGES_NAME,
        title,
        multi,
      } = parseName(img.alt || "")

      parent.children.push({
        type: "image",
        name,
        multi,
        index: multi
          ? parent.children.filter(
              (c) => c.type != "content" && c.name === name,
            ).length
          : undefined,
        alt: title,
        title: img.title || "",
        url: img.url,
      })
    } else if (
      // !foo bar
      isHikeValue(child)
    ) {
      const values = child.children[0].value.split(/\r?\n/)
      values.forEach((value) => {
        const { name = DEFAULT_VALUE_NAME, multi, title } = parseName(value)
        parent.children.push({
          type: "quote",
          name,
          multi,
          index: multi
            ? parent.children.filter(
                (c) => c.type != "content" && c.name === name,
              ).length
            : undefined,
          value: title,
        })
      })
    } else {
      parent.children.push({
        type: "content",
        value: child,
      })
    }
  }

  return root
}

export function isHikeElement(child: any) {
  return (
    isHikeHeading(child) ||
    isHikeCode(child) ||
    isHikeImage(child) ||
    isHikeValue(child)
  )
}

function isHikeValue(child: any): child is {
  type: "paragraph"
  children: [
    {
      type: "text"
      value: string
    },
  ]
} {
  return (
    child.type === "paragraph" &&
    child.children.length === 1 &&
    child.children[0].type === "text" &&
    child.children[0].value?.trim().startsWith("!")
  )
}

function isHikeCode(child: any): child is Code {
  return child.type === "code" && child.meta?.trim().startsWith("!")
}

function isHikeImage(child: any): child is {
  type: "paragraph"
  children: [Image]
} {
  return (
    child.type === "paragraph" &&
    child.children.length === 1 &&
    child.children[0].type === "image" &&
    child.children[0].alt?.startsWith("!")
  )
}

function isHikeHeading(child: any) {
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
  const title = content?.slice(name.length).trim()
  return {
    name: name || undefined,
    title,
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
  const title = content?.slice(name.length).trim()
  return {
    name: name || DEFAULT_BLOCKS_NAME,
    title,
    multi,
  }
}

export async function parseCode(code: Code) {
  return {
    value: code.value,
    lang: code.lang,
    meta: code.meta,
  }
}
