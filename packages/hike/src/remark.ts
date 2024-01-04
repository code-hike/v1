// this adds the jsx node types to Root
import "mdast-util-mdx-jsx"
import { BlockContent, DefinitionContent, Root, Content } from "mdast"

import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"

type Config = {}

export async function transformAllHikes(node: Root | Content, config?: Config) {
  if (node.type === "mdxJsxFlowElement" && node.name === "Hike") {
    return await transformHike(node)
  }

  if ("children" in node && node.children.length > 0) {
    // @ts-ignore
    node.children = await Promise.all(
      node.children.map((child) => transformAllHikes(child, config)),
    )
  }

  return node
}

type JSXChild = BlockContent | DefinitionContent

async function transformHike(node: MdxJsxFlowElement) {
  const rootStep = treeToSteps(node.children)
  node.children = slotToTree(rootStep)

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
    if (child.type === "code") {
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

    // is codeblock (old)
    // const codeSlot = parseCodeSlot(child)
    // if (codeSlot) {
    //   parent.slots.push({
    //     slotName: codeSlot,
    //     parent,
    //     slots: [],
    //     children: [child],
    //     depth: parent.depth + 1,
    //   })
    //   parent.children.push({
    //     type: "mdxJsxFlowElement",
    //     name: "placeholder",
    //     attributes: [
    //       {
    //         type: "mdxJsxAttribute",
    //         name: "name",
    //         value: codeSlot,
    //       },
    //     ],
    //     children: [],
    //   })
    //   return
    // }

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

function slotToTree(slot: Step): MdxJsxFlowElement[] {
  const elements: MdxJsxFlowElement[] = []

  if (slot.slotName === "code") {
    const codeblock = slot as CodeBlockStep
    console.log(codeblock.code)
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
          name: "code",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: '""',
            data: {
              estree: {
                type: "Program",
                body: [
                  {
                    type: "ExpressionStatement",
                    expression: {
                      type: "Literal",
                      value: codeblock.code,
                      raw: JSON.stringify(codeblock.code),
                    },
                  },
                ],
                sourceType: "module",
              },
            },
          },
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

  slot.slots.forEach((slot) => {
    elements.push({
      type: "mdxJsxFlowElement",
      name: "slot",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "name",
          value: slot.slotName,
        },
        {
          type: "mdxJsxAttribute",
          name: "query",
          value: slot.query,
        },
      ],
      children: slotToTree(slot),
    })
  })

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
