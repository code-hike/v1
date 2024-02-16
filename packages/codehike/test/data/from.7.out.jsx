/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
export function getHike(props = {}) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return {
    query: "",
    children: [
      <_components.p>{"Hello!"}</_components.p>,
      <_components.slot name="code" index={0} />,
      <_components.slot name="code" index={1} />,
    ],
    code: [
      {
        value: "// !from ./z.js 3:5",
        lang: "js",
        meta: "my meta",
        parentPath:
          "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\from.0.mdx",
      },
      {
        value: "# !from ./z.py",
        lang: "py",
        meta: "python meta",
        parentPath:
          "C:\\p\\dev\\v1\\packages\\codehike\\test\\data\\from.0.mdx",
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
  return <Hike hike={getHike(props)}></Hike>
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
