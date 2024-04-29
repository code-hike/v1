import { SKIP, visit } from "estree-util-visit"
import { Node } from "mdast"

export function transformHikeProps(root: any) {
  const { functionDeclaration, returnStatement } = findFunctionNodes(root)
  const { jsxOn, rootHike } = detectUsage(returnStatement)

  forEachHikeElementMoveChildrenToHikeProp(root, jsxOn)

  if (rootHike) {
    extractBlocksToConstAndConditionallyReturnThem(
      rootHike,
      functionDeclaration,
      returnStatement,
      jsxOn,
    )
  }

  return root
}

// find the _createMdxContent function and its return statement
function findFunctionNodes(root: any) {
  const { body } = root
  const functionDeclaration = body.find(
    ({ type, id }: any) =>
      type === "FunctionDeclaration" && id?.name === "_createMdxContent",
  )
  const [returnStatement] = find(
    functionDeclaration,
    (node) => node.type === "ReturnStatement",
  )

  return { functionDeclaration, returnStatement }
}

// detect if compiler output is jsx and also if there is a root hike
function detectUsage(returnStatement: any) {
  const returningElement = returnStatement.argument

  const jsxOn = returningElement.type.startsWith("JSX")

  let rootHike = null

  // if there are hike elements not wrapped in a JSX element
  if (
    jsxOn &&
    returningElement?.type === "JSXElement" &&
    returningElement?.openingElement?.attributes?.some(
      (a: any) => a?.name?.name === "__hike",
    ) &&
    returningElement?.openingElement?.name?.property?.name == "slot"
  ) {
    rootHike = returningElement
  }

  if (
    !jsxOn &&
    returningElement?.type === "CallExpression" &&
    returningElement?.arguments[1]?.properties?.some(
      (a: any) => a?.key?.name === "__hike",
    )
  ) {
    rootHike = returningElement
  }

  return { jsxOn, rootHike }
}

function extractBlocksToConstAndConditionallyReturnThem(
  rootHike: any,
  functionDeclaration: any,
  returnStatement: any,
  jsxOn: boolean,
) {
  const blocksConst = {
    type: "VariableDeclaration",
    kind: "const",
    declarations: [
      {
        type: "VariableDeclarator",
        id: { type: "Identifier", name: "_blocks" },
        init: jsxOn
          ? rootHike.openingElement.attributes[0].argument
          : rootHike.arguments[1],
      },
    ],
  }

  // add blocks before return
  functionDeclaration.body.body.splice(
    functionDeclaration.body.body.indexOf(returnStatement),
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
  functionDeclaration.body.body.splice(
    functionDeclaration.body.body.indexOf(returnStatement),
    0,
    ifStatement,
  )

  // change return to _blocks.children
  returnStatement.argument = {
    type: "MemberExpression",
    object: { type: "Identifier", name: "_blocks" },
    property: { type: "Identifier", name: "children" },
  }
}

function forEachHikeElementMoveChildrenToHikeProp(root: any, jsxOn: boolean) {
  visit(root, (node: any) => {
    if (isElementWithHikeAttribute(node, jsxOn)) {
      if (jsxOn) {
        moveChildrenToHikePropJSX(node, jsxOn)
      } else {
        moveChildrenToHikeProp(node)
      }
    }
  })
}

function isElementWithHikeAttribute(node: any, jsxOn: boolean) {
  return jsxOn
    ? node?.type === "JSXElement" &&
        node?.openingElement?.attributes?.some(
          (a: any) => a?.name?.name === "__hike",
        )
    : node?.type === "CallExpression" &&
        node?.arguments[1]?.properties?.some(
          (a: any) => a?.key?.name === "__hike",
        )
}

function moveChildrenToHikePropJSX(node: any, jsxOn: boolean) {
  // dictionary of children by path
  const childrenByPath: any = {}
  node.children.forEach((slot: any) => {
    const path = slot.openingElement.attributes.find(
      (a: any) => a.name.name === "path",
    ).value.value
    childrenByPath[path] = childrenByPath[path] || []
    childrenByPath[path].push(slot.children)
  })

  // replace all the `children` props inside `__hike` with the actual children
  const { attributes } = node.openingElement
  const hikeAttributeIndex = attributes.findIndex(
    (a: any) => a.name.name === "__hike",
  )
  const hikeAttribute = attributes[hikeAttributeIndex]
  visit(hikeAttribute, function (node: any) {
    if (node?.type === "Property" && node?.key?.value === "children") {
      const path = node.value.value

      const elements = childrenByPath[path].shift()

      node.value = elements[0]
      return SKIP
    }
  })

  // remove children from the hike element
  node.children = []

  // remove the `__hike` prop from the attributes
  attributes.splice(hikeAttributeIndex, 1)
  // spread the `__hike` prop to the beginning of the attributes
  attributes.unshift({
    type: "JSXSpreadAttribute",
    argument: hikeAttribute.value.expression,
  })
}

function moveChildrenToHikeProp(node: any) {
  // dictionary of children by path
  const childrenByPath: any = {}
  const childrenExpression = node.arguments[1].properties.find(
    (a: any) => a.key.name === "children",
  ).value
  const children =
    childrenExpression.type === "ArrayExpression"
      ? childrenExpression.elements
      : [childrenExpression]

  children.forEach((callExpression: any) => {
    const path = callExpression.arguments[1]?.properties.find(
      (p: any) => p.key.name === "path",
    ).value.value
    childrenByPath[path] = childrenByPath[path] || []
    childrenByPath[path].push(
      // current slot children
      callExpression.arguments[1].properties.find(
        (p: any) => p.key.name === "children",
      ).value,
    )
  })

  // replace all the `children` props inside `__hike` with the actual children
  const { properties } = node.arguments[1]
  const hikePropertyIndex = properties.findIndex(
    (a: any) => a.key.name === "__hike",
  )
  const hikeProperty = properties[hikePropertyIndex]
  visit(hikeProperty, function (node: any) {
    if (node?.type === "Property" && node?.key?.value === "children") {
      const path = node.value.value

      const elements = childrenByPath[path].shift()

      node.value = elements
      return SKIP
    }
  })

  // remove the `__hike` prop from the attributes
  properties.splice(hikePropertyIndex, 1)
  // spread the `__hike` prop to the beginning of the attributes
  properties.unshift(...hikeProperty.value.properties)

  // remove children from the hike element
  node.arguments[1].properties = properties.filter(
    (p: any) => p.key.name !== "children",
  )
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
