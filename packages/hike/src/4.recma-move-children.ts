import { SKIP, visit } from "estree-util-visit"

export function moveChildrenToHikeProp(node: any) {
  const childrenByPath: any = {}
  node.children.forEach((slot: any) => {
    const path = slot.openingElement.attributes.find(
      (a: any) => a.name.name === "path",
    ).value.value
    childrenByPath[path] = childrenByPath[path] || []
    childrenByPath[path].push(slot.children)
  })

  const hikeAttribute = node.openingElement.attributes.find(
    (a: any) => a.name.name === "hike",
  )
  visit(hikeAttribute, function (node: any) {
    if (node?.type === "Property" && node?.key?.value === "children") {
      const path = node.value.value

      // console.log("visit", path)
      const elements = childrenByPath[path].shift()

      node.value = {
        type: "ArrayExpression",
        elements,
      }
      return SKIP
    }
  })

  node.children = []
}
