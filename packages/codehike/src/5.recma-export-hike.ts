import { SKIP, visit } from "estree-util-visit"

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

  const _createMdxContentReturn = find(
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
  const returnStatement = find(
    getHike,
    (node) => node.type === "ReturnStatement",
  )
  const hikeAttribute = find(
    returnStatement,
    (node) => node.type === "JSXAttribute" && node?.name?.name === "hike",
  )
  const hikeObject = hikeAttribute.value.expression
  returnStatement.argument = hikeObject

  // change _createMdxContent attribute to getHike()
  const _createMdxHikeAttribute = find(
    _createMdxContentReturn,
    (node) => node.type === "JSXAttribute" && node?.name?.name === "hike",
  )
  _createMdxHikeAttribute.value.expression = {
    type: "CallExpression",
    callee: { type: "Identifier", name: "getHike" },
    arguments: [{ type: "Identifier", name: "props" }],
    optional: false,
  }
}

function find(node: any, predicate: (node: any) => boolean) {
  let result: any
  visit(node, (node: any) => {
    if (predicate(node)) {
      result = node
      return SKIP
    }
  })
  return result
}
