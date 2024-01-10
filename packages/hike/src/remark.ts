// this adds the jsx node types to Root
import "mdast-util-mdx-jsx"
import { BlockContent, DefinitionContent, Root, Content } from "mdast"

import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import { getLiteralAttribute } from "./estree.js"

type Config = {}

export async function transformAllHikes(
  node: Root | Content,
  config?: Config,
  file?: any,
) {
  const mdxPath = file?.history
    ? file.history[file.history.length - 1]
    : undefined

  if (node.type === "mdxJsxFlowElement" && node.name === "Hike") {
    return await transformHike(node, mdxPath)
  }

  if ("children" in node && node.children.length > 0) {
    // @ts-ignore
    node.children = await Promise.all(
      node.children.map((child) => transformAllHikes(child, config, file)),
    )
  }

  return node
}

type JSXChild = BlockContent | DefinitionContent

async function transformHike(node: MdxJsxFlowElement, mdxPath?: string) {
  const rootStep = treeToSteps(node.children)
  node.children = await slotToTree(rootStep, mdxPath)

  return node
}

type Step = {
  slotName: string
  query?: string
  children: JSXChild[]
  depth: number
  parent?: Step
  slots: (Step | CodeBlockStep)[]
}

type CodeBlockStep = Step & {
  lang?: string | null | undefined
  meta?: string | null | undefined
  code: string
}

function treeToSteps(children: (BlockContent | DefinitionContent)[]): Step {
  const root: Step = {
    slotName: "root",
    children: [],
    slots: [],
    depth: 0,
  }
  let parent = root

  children.forEach((child) => {
    if (child.type === "code" && !child.meta?.includes("!ch-exclude")) {
      parent.slots.push({
        slotName: "code",
        parent,
        slots: [],
        children: [child],
        depth: parent.depth + 1,
        lang: child.lang,
        meta: child.meta,
        code: child.value,
      })

      parent.children.push({
        type: "mdxJsxFlowElement",
        name: "placeholder",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "name",
            value: "code",
          },
        ],
        children: [],
      })

      return
    }

    const { slotName, query, depth, close } = parseHeading(child)

    // closing header `## /`
    if (close) {
      while (parent.depth >= depth && parent.parent) {
        parent = parent.parent || root
      }
      return
    }

    // not a header
    if (!slotName) {
      parent.children.push(child)
      return
    }

    const step: Step = {
      slotName,
      query,
      children: [],
      slots: [],
      depth: depth,
    }

    if (depth > parent.depth) {
      step.parent = parent
      parent.slots.push(step)
      parent = step
    } else {
      while (depth <= parent.depth && parent.parent) {
        parent = parent.parent || root
      }
      step.parent = parent
      parent.slots.push(step)
      parent = step
    }

    parent.parent!.children.push({
      type: "mdxJsxFlowElement",
      name: "placeholder",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "name",
          value: slotName,
        },
      ],
      children: [],
    })
  })

  return root
}

async function slotToTree(
  slot: Step,
  mdxPath?: string,
): Promise<MdxJsxFlowElement[]> {
  const elements: MdxJsxFlowElement[] = []

  if (slot.slotName === "code") {
    const codeblock = slot as CodeBlockStep

    elements.push({
      type: "mdxJsxFlowElement",
      name: "slot",
      attributes: [
        // TODO we can remove this
        {
          type: "mdxJsxAttribute",
          name: "role",
          value: "code",
        },
        {
          type: "mdxJsxAttribute",
          name: "lang",
          value: codeblock.lang,
        },
        {
          type: "mdxJsxAttribute",
          name: "meta",
          value: codeblock.meta,
        },
        {
          type: "mdxJsxAttribute",
          name: "parentPath",
          value: mdxPath,
        },
        {
          type: "mdxJsxAttribute",
          name: "code",
          value: getLiteralAttribute(codeblock.code),
        },
      ],
      children: [],
    })
  } else {
    elements.push({
      type: "mdxJsxFlowElement",
      name: "slot",
      attributes: [
        // TODO we can remove this
        {
          type: "mdxJsxAttribute",
          name: "role",
          value: "children",
        },
      ],
      children: slot.children,
    })
  }

  for (const s of slot.slots) {
    elements.push({
      type: "mdxJsxFlowElement",
      name: "slot",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "name",
          value: s.slotName,
        },
        {
          type: "mdxJsxAttribute",
          name: "query",
          value: s.query,
        },
      ],
      children: await slotToTree(s, mdxPath),
    })
  }

  return elements
}

function parseHeading(child: JSXChild) {
  if (
    child.type === "heading" &&
    child.children[0]?.type === "text" &&
    child.children[0]?.value?.trim() === "/"
  ) {
    return {
      depth: child.depth,
      close: true,
    }
  }

  // TODO use config prefix
  const prefix = "!"
  if (
    child.type === "heading" &&
    child.children[0]?.type === "text" &&
    child.children[0]?.value?.trim().startsWith(prefix)
  ) {
    const content = child.children[0]?.value?.trim().slice(prefix.length)
    // get first word of content (split any whitespace)
    const slotName = content?.split(/\s+/)[0]
    const query = content?.slice(slotName.length).trim()
    return {
      slotName: slotName || "steps",
      query,
      depth: child.depth,
      close: false,
    }
  }

  return {}
}

function parseCodeSlot(child: JSXChild) {
  if (child.type === "code") {
    // codeblock
    return "code"
  }

  if (child.type !== "mdxJsxFlowElement" || child.name !== "Code") {
    // no <Code/>
    return false
  }

  const slotAttribute = child.attributes.find(
    (attr: any) => attr.name === "slot",
  )

  if (slotAttribute && slotAttribute.value === "ignore") {
    // <Code slot="ignore"/>
    return false
  }
  // <Code /> or <Code slot="something" />
  return typeof slotAttribute?.value === "string" ? slotAttribute.value : "code"
}
