/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
export function getBlocks(props = {}) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Code } = _components
  if (!Code) _missingMdxReference("Code", true)
  return {
    children: [
      <_components.p>{"Hello world!"}</_components.p>,
      <Code
        codeblock={{
          value: 'console.log("hello world")\r\nconsole.log("bye world")',
          lang: "js",
          meta: "my meta",
          parentPath:
            "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\code.0.mdx",
        }}
      />,
      <Code
        codeblock={{
          value: "// !Mark(2)",
          lang: "jsonc",
          meta: "THE CUSTOMER OBJECT",
          parentPath:
            "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\code.0.mdx",
        }}
      />,
    ],
    query: "",
  }
}
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Code } = _components
  if (!Code) _missingMdxReference("Code", true)
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
