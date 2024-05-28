/*@jsxRuntime automatic @jsxImportSource react*/
import { CodeWithNotes } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Demo } = _components
  if (!Demo) _missingMdxReference("Demo", true)
  return (
    <_components.slot
      __hike={{
        children: "",
        title: "",
        _data: {
          header: "",
        },
        Demo: {
          children: "Demo",
          title: "",
          _data: {
            header: "## !Demo",
          },
        },
        implementation: {
          children: "implementation",
          title: "",
          _data: {
            header: "## !implementation",
          },
        },
        notes: [
          {
            children: "notes",
            title: "x",
            _data: {
              header: "## !!notes x",
            },
          },
        ],
      }}
    >
      <_components.slot path="">
        <>
          <Demo name="Demo" />
        </>
      </_components.slot>
      <_components.slot path="Demo">
        <_components.p>{"Add callouts inside your code blocks."}</_components.p>
      </_components.slot>
      <_components.slot path="implementation">
        <_components.p>{"foo"}</_components.p>
      </_components.slot>
      <_components.slot path="notes">
        <_components.p>{"y"}</_components.p>
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
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
