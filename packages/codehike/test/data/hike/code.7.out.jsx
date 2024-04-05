/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return (
    <Hike foo={"bar"}>
      <_components.p>{"Hello world!"}</_components.p>
      <MyCode
        codeblock={{
          type: "code",
          lang: "js",
          meta: "my meta",
          value: 'console.log("hello world")\r\nconsole.log("bye world")',
          position: {
            start: {
              line: 7,
              column: 1,
              offset: 79,
            },
            end: {
              line: 10,
              column: 4,
              offset: 151,
            },
          },
        }}
      />
      <MyCode
        codeblock={{
          type: "code",
          lang: "jsonc",
          meta: "THE CUSTOMER OBJECT",
          value: "// !Mark(2)",
          position: {
            start: {
              line: 12,
              column: 1,
              offset: 155,
            },
            end: {
              line: 14,
              column: 4,
              offset: 201,
            },
          },
        }}
      />
    </Hike>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
}
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
