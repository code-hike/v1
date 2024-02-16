/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
export function getHike(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return {
    query: "",
    children: [
      <_components.p>{"Hello world!"}</_components.p>,
      <_components.slot name="code" index={0} />,
      <_components.slot name="code" index={1} />,
    ],
    code: [
      {
        value: 'console.log("hello world")\r\nconsole.log("bye world")',
        lang: "js",
        meta: "my meta",
        parentPath:
          "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\code.0.mdx",
      },
      {
        value: "// !Mark(2)",
        lang: "jsonc",
        meta: "THE CUSTOMER OBJECT",
        parentPath:
          "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\code.0.mdx",
      },
    ],
  }
}
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return <Hike foo={"bar"} hike={getHike(props)}></Hike>
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
