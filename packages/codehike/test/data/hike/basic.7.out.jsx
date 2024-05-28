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
  const _blocks = {
    children: (
      <>
        <Demo name="Demo" />
      </>
    ),
    title: "",
    _data: {
      header: "",
    },
    Demo: {
      children: (
        <_components.p>{"Add callouts inside your code blocks."}</_components.p>
      ),
      title: "",
      _data: {
        header: "## !Demo",
      },
    },
    implementation: {
      children: <_components.p>{"foo"}</_components.p>,
      title: "",
      _data: {
        header: "## !implementation",
      },
    },
    notes: [
      {
        children: <_components.p>{"y"}</_components.p>,
        title: "x",
        _data: {
          header: "## !!notes x",
        },
      },
    ],
  }
  if (props._returnBlocks) {
    return _blocks
  }
  return _blocks.children
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
