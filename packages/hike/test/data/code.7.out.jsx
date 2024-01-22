/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return (
    <Hike
      foo={"bar"}
      hike={{
        query: "",
        children: [
          <_components.p>{"Hello world!"}</_components.p>,
          <_components.slot name="code" />,
          <_components.slot name="code" />,
        ],
        code: [
          {
            value: 'console.log("hello world")\r\nconsole.log("bye world")',
            lang: "js",
            meta: "my meta",
            parentPath: undefined,
          },
          {
            value: "// !Mark(2)",
            lang: "jsonc",
            meta: "THE CUSTOMER OBJECT",
            parentPath: undefined,
          },
        ],
      }}
    ></Hike>
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
