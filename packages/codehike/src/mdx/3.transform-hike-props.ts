import { SKIP, visit } from "estree-util-visit"
import { Node } from "mdast"

export function transformHikeProps(root: any) {
  const { body } = root
  const _createMdxContent = body.find(
    ({ type, id }: any) =>
      type === "FunctionDeclaration" && id?.name === "_createMdxContent",
  )
  const [_createMdxContentReturn] = find(
    _createMdxContent,
    (node) => node.type === "ReturnStatement",
  )
  const returningElement = _createMdxContentReturn.argument

  let rootHike = null
  // if there are hike elements not wrapped in a JSX element
  if (
    returningElement?.type === "JSXElement" &&
    returningElement?.openingElement?.attributes?.some(
      (a: any) => a?.name?.name === "__hike",
    ) &&
    returningElement?.openingElement?.name?.property?.name == "slot"
  ) {
    rootHike = returningElement
  }

  visit(root, (node: any) => {
    if (
      node?.type === "JSXElement" &&
      node?.openingElement?.attributes?.some(
        (a: any) => a?.name?.name === "__hike",
      )
    ) {
      moveChildrenToHikeProp(node)
    }
  })

  if (rootHike) {
    const blocksConst = {
      type: "VariableDeclaration",
      kind: "const",
      declarations: [
        {
          type: "VariableDeclarator",
          id: { type: "Identifier", name: "_blocks" },
          init: rootHike.openingElement.attributes[0].argument,
        },
      ],
    }
    // add blocks before return
    _createMdxContent.body.body.splice(
      _createMdxContent.body.body.indexOf(_createMdxContentReturn),
      0,
      blocksConst,
    )

    const ifStatement = {
      type: "IfStatement",
      // test if props._returnBlocks is truthy
      test: {
        type: "MemberExpression",
        object: { type: "Identifier", name: "props" },
        property: { type: "Identifier", name: "_returnBlocks" },
      },
      consequent: {
        type: "BlockStatement",
        body: [
          {
            type: "ReturnStatement",
            // return _blocks
            argument: {
              type: "Identifier",
              name: "_blocks",
            },
          },
        ],
      },
    }

    // add if before return
    _createMdxContent.body.body.splice(
      _createMdxContent.body.body.indexOf(_createMdxContentReturn),
      0,
      ifStatement,
    )

    // change return to _blocks.children
    _createMdxContentReturn.argument = {
      type: "MemberExpression",
      object: { type: "Identifier", name: "_blocks" },
      property: { type: "Identifier", name: "children" },
    }
  }

  // addBlocksExport(root)

  return root
}

//
export function moveChildrenToHikeProp(node: any) {
  const childrenByPath: any = {}
  node.children.forEach((slot: any) => {
    const path = slot.openingElement.attributes.find(
      (a: any) => a.name.name === "path",
    ).value.value
    childrenByPath[path] = childrenByPath[path] || []
    childrenByPath[path].push(slot.children)
  })

  const { attributes } = node.openingElement
  const hikeAttributeIndex = attributes.findIndex(
    (a: any) => a.name.name === "__hike",
  )
  const hikeAttribute = attributes[hikeAttributeIndex]
  visit(hikeAttribute, function (node: any) {
    if (node?.type === "Property" && node?.key?.value === "children") {
      const path = node.value.value

      // console.log("visit", path)
      const elements = childrenByPath[path].shift()

      node.value = elements[0]
      return SKIP
    }
  })

  node.children = []
  attributes.splice(hikeAttributeIndex, 1)
  attributes.unshift({
    type: "JSXSpreadAttribute",
    argument: hikeAttribute.value.expression,
  })
}

function find(node: any, predicate: (node: any) => boolean) {
  let result: any = []
  visit(
    node,
    (
      node: Node,
      key: string | undefined,
      index: number | undefined,
      ancestors: Array<Node>,
    ) => {
      if (predicate(node)) {
        result = [node, ...ancestors.slice().reverse()]
        return SKIP
      }
    },
  )
  return result
}
