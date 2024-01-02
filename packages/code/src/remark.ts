// this add the jsx node types to Root
import "mdast-util-mdx-jsx"
import { Content, Root, Code } from "mdast"
import { tokenize } from "./code-to-tokens.js"
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import { Annotation, Theme, getThemeColors } from "@code-hike/lighter"
import { AnyToken, CodeBlock, FinalConfig, isGroup } from "./types.js"
import {
  getCodeBlocksAttribute,
  getComponentsAttribute,
  getConfigAttribute,
  getTemplateLiteralAttribute,
  getTokensAttribute,
} from "./estree.js"
import { splitAnnotationsAndCode } from "./extract-annotations.js"

type Config = {
  theme: Theme
  annotationPrefix?: string
}

export async function codeTransform(tree: Root, config?: Config) {
  const { theme = "github-dark" } = config || {}
  const finalConfig: FinalConfig = {
    annotationPrefix: "!",
    ...config,
    theme,
    themeName: typeof theme === "string" ? theme : theme.name!,
  }

  // TODO: dont add style if there's no code
  await prependStyle(tree, finalConfig)
  await transformAllCode(tree, finalConfig)
  return tree
}

export async function transformAllCode(
  node: Root | Content,
  config: FinalConfig,
) {
  if (node.type === "mdxJsxFlowElement" && node.name === "Code") {
    return await transformCodeComponent(node, config)
  }

  if (node.type === "code") {
    return await transformCode(node, config)
  }

  if ("children" in node && node.children.length > 0) {
    // @ts-ignore
    node.children = await Promise.all(
      node.children.map((child) => transformAllCode(child, config)),
    )
  }

  return node
}

export async function transformCodeComponent(
  node: MdxJsxFlowElement,
  config: FinalConfig,
): Promise<MdxJsxFlowElement> {
  const { theme, themeName } = config || {}
  const codeblocks = await Promise.all(
    node.children
      .filter((c) => c.type === "code")
      .map((codeblock) => parseCodeBlock(codeblock as Code, config)),
  )
  const annotationNames = getAnnotationNames(codeblocks)

  node.attributes.push({
    type: "mdxJsxAttribute",
    name: "config",
    value: getConfigAttribute({ themeName }) as any,
  })

  node.attributes.push({
    type: "mdxJsxAttribute",
    name: "codeblocks",
    value: getCodeBlocksAttribute(codeblocks) as any,
  })

  node.attributes.push({
    type: "mdxJsxAttribute",
    name: "components",
    value: getComponentsAttribute(annotationNames) as any,
  })

  node.children = []

  return node
}

export async function transformCode(
  node: Code,
  config: FinalConfig,
): Promise<MdxJsxFlowElement> {
  const { theme, themeName } = config || {}
  let codeblock = await parseCodeBlock(node, config)
  const annotationNames = getAnnotationNames([codeblock])

  return {
    type: "mdxJsxFlowElement",
    name: "Code",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "config",
        value: getConfigAttribute({ themeName }) as any,
      },
      {
        type: "mdxJsxAttribute",
        name: "codeblocks",
        value: getCodeBlocksAttribute([codeblock]) as any,
      },
      {
        type: "mdxJsxAttribute",
        name: "components",
        value: getComponentsAttribute(annotationNames),
      },
    ],
    children: [],
  }
}

async function parseCodeBlock(
  node: Code,
  config: FinalConfig,
): Promise<CodeBlock> {
  let { lang, meta, value } = node
  lang = lang || "txt"
  // if lang has a "." it's a file extension, so we extract it
  if (lang.includes(".")) {
    const splits = lang.split(".")
    lang = splits.pop()!
  }

  const { code: codeWithoutAnnotations, annotations } =
    await splitAnnotationsAndCode(value, lang, config)

  return { lang, meta: meta || "", value: codeWithoutAnnotations, annotations }
}

// find all the annotation names in the tokens tree
function getAnnotationNames(codeblocks: CodeBlock[]): string[] {
  const names = new Set<string>()
  codeblocks.forEach(({ annotations }) => {
    annotations.forEach((annotation) => {
      names.add(annotation.name)
    })
  })
  return Array.from(names)
}

async function prependStyle(tree: Root, config: FinalConfig) {
  const { theme } = config
  const themeName = typeof theme === "string" ? theme : theme.name!

  const style = await getStyle(theme, themeName)
  tree.children.unshift({
    type: "mdxJsxFlowElement",
    name: "style",
    attributes: [],
    children: [
      {
        type: "mdxFlowExpression",
        value: `"${style}"`,
        data: {
          estree: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "Literal",
                  value: style,
                  raw: `"${style}"`,
                },
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      },
    ],
    data: {
      _mdxExplicitJsx: true,
    },
  } as any)
}

const styleCache = new Map<string, string>()
async function getStyle(
  theme: Config["theme"],
  themeName: string,
): Promise<string> {
  if (styleCache.has(themeName)) {
    return styleCache.get(themeName)!
  }
  const rules = await getCSSVariables(theme)
  const style = `[data-ch-theme=${themeName}] \{  ${rules} \} [data-ch-theme=${themeName}] ::selection \{background-color: var(--ch-t-editor-selectionBackground);color: inherit;\}`
  styleCache.set(themeName, style)
  return style
}

async function getCSSVariables(theme: Config["theme"]) {
  const themeColors = await getThemeColors(theme)

  if (!themeColors || typeof themeColors !== "object") {
    throw new Error("[Code Hike error] Unknown theme format")
  }
  let rules = ""
  for (const [first, value] of Object.entries(themeColors)) {
    if (!value) {
      continue
    }
    if (typeof value === "string") {
      rules += `--ch-t-${first}: ${value};`
    } else {
      for (const [second, svalue] of Object.entries(value)) {
        if (!svalue) {
          continue
        }
        rules += `--ch-t-${first}-${second}: ${svalue};`
      }
    }
  }
  return rules
}
