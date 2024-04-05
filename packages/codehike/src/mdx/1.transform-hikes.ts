import { Root } from "mdast"
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import { visit } from "unist-util-visit"
import { isHikeElement, listToSection } from "../1.remark-list-to-section.js"
import { sectionToAttribute } from "../2.remark-section-to-attribute.js"

export async function transformAllHikes(root: Root) {
  let tree = wrapInHike(root)

  const hikes: MdxJsxFlowElement[] = []

  visit(tree, "mdxJsxFlowElement", (node) => {
    // if (node.children.some(isHikeElement)) {
    // }
    if (node.name === "Hike") {
      hikes.push(node)
    }
  })

  await Promise.all(hikes.map(transformRemarkHike))

  return tree
}

function wrapInHike(root: Root) {
  // if we find any hikeable element outside of <Hike>s,
  // let's wrap everything in a <Hike>
  if (root.children.some(isHikeElement)) {
    root.children = [
      {
        type: "mdxJsxFlowElement",
        name: "Hike",
        attributes: [],
        // todo what is different between RootContent and (BlockContent | DefinitionContent)
        children: root.children as any,
      },
    ]
  }
  return root
}

async function transformRemarkHike(node: MdxJsxFlowElement) {
  const section = await listToSection(node)
  const { children, attributes } = sectionToAttribute(section)

  node.children = children
  node.attributes.push(...attributes)

  const asAttribute = node.attributes.find((a: any) => a.name === "as") as any
  const debug = node.attributes.find((a: any) => a.name === "debug")
  node.attributes = node.attributes.filter((a: any) => a.name !== "as")
  if (asAttribute && !debug) {
    node.name = asAttribute?.value?.value || "Hike"
  }

  return node
}
