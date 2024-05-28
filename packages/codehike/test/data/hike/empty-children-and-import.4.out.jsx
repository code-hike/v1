/*@jsxRuntime automatic @jsxImportSource react*/
import { x } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return (
    <_components.slot
      __hike={{
        children: "",
        title: "",
        _data: {
          header: "",
        },
        demo: {
          children: "demo",
          title: "",
          _data: {
            header: "## !demo",
          },
        },
      }}
    >
      <_components.slot path="" />
      <_components.slot path="demo">
        <_components.p>{"Add callouts inside your code blocks."}</_components.p>
      </_components.slot>
    </_components.slot>
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
