import { Code } from "mdast"
import { HikeTree, JSXChild, RemarkSection } from "./1.remark-list-to-tree.js"

export type HydratedSection = {
  path: string[]
  query: string
  name: string
  sections: HydratedSection[]
  children: JSXChild[]
  code: CodeBlock[]
}

export type CodeBlock = {
  value: string
  lang?: string | null | undefined
  meta?: string | null | undefined
  parentPath?: string
}

export function hydrateTree(tree: HikeTree, prefix: string) {
  const { sections, children, code } = tree
  const path: string[] = []
  return {
    path,
    query: "",
    name: "",
    sections: sections.map((section) => hydrateSection(section, path, prefix)),
    children: children,
    code: code.map((code) => parseCode(code)),
  }
}

function hydrateSection(
  section: RemarkSection,
  parentPath: string[],
  prefix: string,
): HydratedSection {
  const { name, query, sections, children, code } = section
  const path = [...parentPath, name]
  return {
    path,
    name,
    query,
    sections: sections.map((section) => hydrateSection(section, path, prefix)),
    children: children,
    code: code.map((code) => parseCode(code)),
  }
}

function parseCode(code: Code) {
  return {
    value: code.value,
    lang: code.lang,
    meta: code.meta,
  }
}