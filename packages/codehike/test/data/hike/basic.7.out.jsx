/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  const _blocks = {
    children: (
      <>
        <_components.p>{"hey"}</_components.p>
        <_components.slot name="foo" />
      </>
    ),
    title: "",
    _data: {
      header: "",
    },
    foo: {
      children: <_components.p>{"bin"}</_components.p>,
      title: "bar",
      _data: {
        header: "## !foo bar",
      },
    },
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
