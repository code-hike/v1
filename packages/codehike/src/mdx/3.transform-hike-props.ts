import { addBlocksExport } from "../5.recma-export-hike.js"
import { SKIP, visit } from "estree-util-visit"
import { moveChildrenToHikeProp } from "../4.recma-move-children.js"

export function transformHikeProps(root: any) {
  visit(root, (node: any) => {
    if (
      node?.type === "JSXElement" &&
      node?.openingElement?.attributes?.some(
        (a: any) => a?.name?.name === "__hike",
      )
    ) {
      transformRecmaHike(node)
      return SKIP
    }
  })

  addBlocksExport(root)

  return root
}

function transformRecmaHike(node: any) {
  moveChildrenToHikeProp(node)
}
