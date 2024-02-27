/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
export function getBlocks(props = {}) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return {
    children: [
      <_components.p>{"Hello world!"}</_components.p>,
      <MyCode
        codeblock={{
          value: 'console.log("hello world")\r\nconsole.log("bye world")',
          lang: "js",
          meta: "my meta",
        }}
      />,
      <MyCode
        codeblock={{
          value: "// !Mark(2)",
          lang: "jsonc",
          meta: "THE CUSTOMER OBJECT",
        }}
      />,
    ],
    query: "",
    _data: {
      header: "",
    },
  }
}
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return <Hike foo={"bar"} hike={getBlocks(props)}></Hike>
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
