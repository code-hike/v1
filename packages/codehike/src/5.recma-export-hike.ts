import { SKIP, visit } from "estree-util-visit"
import { Node } from "mdast"

export function addHikeExport(program: any) {
  // remove default funcion
  // node.body = node.body.filter(
  //   (node: any) => node?.type !== "ExportDefaultDeclaration",
  // )

  // find _createMdxContent
  const { body } = program
  const _createMdxContent = body.find(
    ({ type, id }: any) =>
      type === "FunctionDeclaration" && id?.name === "_createMdxContent",
  )

  const [_createMdxContentReturn] = find(
    _createMdxContent,
    (node) => node.type === "ReturnStatement",
  )

  // stop if _createMdxContent is returning an element
  // with the hike attribute
  if (
    !_createMdxContentReturn ||
    _createMdxContentReturn.argument?.type !== "JSXElement" ||
    !_createMdxContentReturn.argument?.openingElement?.attributes.find(
      (attr: any) => attr?.name?.name === "hike",
    )
  ) {
    return
  }

  // creatae getHike function
  const getHike = {
    type: "ExportNamedDeclaration",
    declaration: {
      ...JSON.parse(JSON.stringify(_createMdxContent)),
      id: { type: "Identifier", name: "getHike" },
    },
    specifiers: [],
    source: null,
  }

  // insert before _createMdxContent
  body.splice(body.indexOf(_createMdxContent), 0, getHike)

  // change getHike return to hike object
  const [returnStatement] = find(
    getHike,
    (node) => node.type === "ReturnStatement",
  )
  const [hikeAttribute] = find(
    returnStatement,
    (node) => node.type === "JSXAttribute" && node?.name?.name === "hike",
  )
  const hikeObject = hikeAttribute.value.expression
  returnStatement.argument = hikeObject

  // change _createMdxContent attribute to getHike()
  const [_createMdxHikeAttribute] = find(
    _createMdxContentReturn,
    (node) => node.type === "JSXAttribute" && node?.name?.name === "hike",
  )
  _createMdxHikeAttribute.value.expression = {
    type: "CallExpression",
    callee: { type: "Identifier", name: "getHike" },
    arguments: [{ type: "Identifier", name: "props" }],
    optional: false,
  }

  // remove `if (!Hike) _missingMdxReference("Hike", true)`
  const [missingMdxReference, parent] = find(
    getHike,
    (node) =>
      node.type === "IfStatement" &&
      node.test?.type === "UnaryExpression" &&
      node.test?.operator === "!" &&
      node.test?.argument?.name === "Hike",
  )
  if (missingMdxReference) {
    parent.body = parent.body.filter(
      (node: any) => node !== missingMdxReference,
    )
  }

  // add default props: getHike(props = {})
  getHike.declaration.params = [
    {
      type: "AssignmentPattern",
      left: { type: "Identifier", name: "props" },
      right: { type: "ObjectExpression", properties: [] },
    },
  ]
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
