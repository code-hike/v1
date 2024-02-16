/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Code } = _components
  if (!Code) _missingMdxReference("Code", true)
  return (
    <Hike
      __hike={{
        children: "",
        query: "",
      }}
    >
      <_components.slot path="">
        <_components.p>{"Hello!"}</_components.p>
        <Code
          codeblock={{
            value: "// !from ./z.js 3:5",
            lang: "js",
            meta: "my meta",
            parentPath:
              "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\from.0.mdx",
          }}
        />
        <Code
          codeblock={{
            value: "# !from ./z.py",
            lang: "py",
            meta: "python meta",
            parentPath:
              "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\from.0.mdx",
          }}
        />
      </_components.slot>
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
