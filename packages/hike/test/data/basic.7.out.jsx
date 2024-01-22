/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Code, Foo } = _components
  if (!Code) _missingMdxReference("Code", true)
  if (!Foo) _missingMdxReference("Foo", true)
  return (
    <>
      <Code
        codeblock={{
          value: 'console.log("hello")\r\nconsole.log("hello")',
          lang: "js",
          meta: null,
          parentPath: "C:\\p\\dev\\v1\\packages\\hike\\test\\data\\basic.0.mdx",
        }}
      />
      {"\n"}
      <Foo
        hike={{
          query: "",
          children: [<_components.p>{"hey"}</_components.p>],
        }}
      ></Foo>
    </>
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
