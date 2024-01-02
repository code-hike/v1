import { MdxJsxAttributeValueExpression } from "mdast-util-mdx-jsx"
import { AnyToken } from "./types"

// returns Code prop:
// components={{
//      ..._components,
//      ...(typeof MyAnnotation1 !== "undefined" && { MyAnnotation1 }),
//      ...(typeof MyAnnotation2 !== "undefined" && { MyAnnotation2 })
// }}
export function getComponentsAttribute(
  names: string[],
): MdxJsxAttributeValueExpression {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: "_",
    data: program([
      {
        type: "ExpressionStatement",
        expression: {
          type: "ObjectExpression",
          properties: [
            provideComponents,
            // ...props.components
            {
              type: "SpreadElement",
              argument: { type: "Identifier", name: "props.components" },
            },
            ...names.map(getSpreadElement),
          ],
        },
      },
    ]),
  }
}

function program(body: any[]): any {
  return {
    estree: {
      type: "Program",
      body: body,
      sourceType: "module",
      comments: [],
    },
  }
}

// returns: ...(typeof _provideComponents == "function" && _provideComponents())
const provideComponents = {
  type: "SpreadElement",
  argument: {
    type: "LogicalExpression",
    left: {
      type: "BinaryExpression",
      left: {
        type: "UnaryExpression",
        operator: "typeof",
        prefix: true,
        argument: {
          type: "Identifier",
          name: "_provideComponents",
        },
      },
      operator: "===",
      right: {
        type: "Literal",
        value: "function",
        raw: '"function"',
      },
    },
    operator: "&&",
    right: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "_provideComponents",
      },
      arguments: [],
    },
  },
}

// returns: ...(typeof Name !== "undefined" && { Name })
export function getSpreadElement(name: string): any {
  return {
    type: "SpreadElement",
    argument: {
      type: "LogicalExpression",
      left: {
        type: "BinaryExpression",
        left: {
          type: "UnaryExpression",
          operator: "typeof",
          prefix: true,
          argument: {
            type: "Identifier",
            name: name,
          },
        },
        operator: "!==",
        right: {
          type: "Literal",
          value: "undefined",
          raw: '"undefined"',
        },
      },
      operator: "&&",
      right: {
        type: "ObjectExpression",
        properties: [
          {
            type: "Property",
            method: false,
            shorthand: true,
            computed: false,
            key: {
              type: "Identifier",
              name: name,
            },
            kind: "init",
            value: {
              type: "Identifier",
              name: name,
            },
          },
        ],
      },
    },
  }
}

export function getConfigDeclaration(
  config: any,
  CH_CODE_CONFIG_VAR_NAME: string,
) {
  return {
    type: "mdxjsEsm",
    value: `export const ${CH_CODE_CONFIG_VAR_NAME} = {}`,

    data: program([
      {
        type: "ExportNamedDeclaration",
        declaration: {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: CH_CODE_CONFIG_VAR_NAME,
              },
              init: serialize(config),
            },
          ],
          kind: "const",
        },
        specifiers: [],
        source: null,
      },
    ]),
  }
}

export function getConfigAttribute(CH_CODE_CONFIG_VAR_NAME: string) {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: "{}",
    data: program([
      {
        type: "ExpressionStatement",
        expression: { type: "Identifier", name: CH_CODE_CONFIG_VAR_NAME },
      },
    ]),
  }
}

export function getCodeBlocksAttribute(codeblocks: any[]) {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: "[]",
    data: program([
      {
        type: "ExpressionStatement",
        expression: {
          type: "ArrayExpression",
          elements: codeblocks.map(serialize),
        },
      },
    ]),
  }
}

export function getTokensAttribute(tokens: AnyToken[]): any {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: "[]",
    data: program([
      {
        type: "ExpressionStatement",
        expression: {
          type: "ArrayExpression",
          elements: tokens.map(serialize),
        },
      },
    ]),
  }
}

export function getTemplateLiteralAttribute(value: string): any {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: "",
    data: program([
      {
        type: "ExpressionStatement",
        expression: {
          type: "TemplateLiteral",
          expressions: [],
          quasis: [
            {
              type: "TemplateElement",
              value: { raw: value, cooked: value },
              tail: true,
            },
          ],
        },
      },
    ]),
  }
}

function serialize(value: any): any {
  // is array
  if (Array.isArray(value)) {
    return {
      type: "ArrayExpression",
      elements: value.map(serialize),
    }
  }
  // is object
  if (typeof value === "object") {
    return {
      type: "ObjectExpression",
      properties: Object.entries(value).map(([key, value]) => ({
        type: "Property",
        method: false,
        shorthand: false,
        computed: false,
        key: {
          type: "Literal",
          value: key,
        },
        kind: "init",
        value: serialize(value),
      })),
    }
  }

  // is literal
  return {
    type: "Literal",
    value: value,
    raw: JSON.stringify(value),
  }
}
