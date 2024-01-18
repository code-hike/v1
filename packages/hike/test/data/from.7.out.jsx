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
      hike={{
        query: "",
        children: [
          <_components.p>{"Hello!"}</_components.p>,
          <_components.slot name="code" />,
          <_components.slot name="code" />,
        ],
        code: [
          {
            value: "// !from ./z.js 3:5",
            lang: "js",
            meta: "my meta",
          },
          {
            value: "# !from ./z.py",
            lang: "py",
            meta: "python meta",
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
