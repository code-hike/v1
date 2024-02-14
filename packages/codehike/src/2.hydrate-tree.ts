import { Code, Image } from "mdast"
import { HikeTree, JSXChild, RemarkSection } from "./1.remark-list-to-tree.js"

export type HydratedSection = {
  path: string[]
  query: string
  name: string
  sections: HydratedSection[]
  children: JSXChild[]
  code: CodeBlock[]
  images: {
    key: string
    value: Image
  }[]
}

export type CodeBlock = {
  value: string
  lang?: string | null | undefined
  meta?: string | null | undefined
  parentPath?: string
}

export function hydrateTree(tree: HikeTree, mdxPath?: string) {
  const { sections, children, code, images } = tree
  const path: string[] = []
  return {
    path,
    query: "",
    name: "",
    sections: sections.map((section) => hydrateSection(section, path, mdxPath)),
    children: children,
    code: code.map((code) => parseCode(code, mdxPath)),
    images,
  }
}

function hydrateSection(
  section: RemarkSection,
  parentPath: string[],
  mdxPath?: string,
): HydratedSection {
  const { name, query, sections, children, code, images } = section
  const path = [...parentPath, name]
  return {
    path,
    name,
    query,
    sections: sections.map((section) => hydrateSection(section, path, mdxPath)),
    children: children,
    code: code.map((code) => parseCode(code, mdxPath)),
    images,
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
