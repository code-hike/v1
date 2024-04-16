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
        <_components.p>{"hello"}</_components.p>
        <_components.slot name="foo" />
        <_components.p>{"hey"}</_components.p>
      </>
    ),
    title: "",
    _data: {
      header: "",
    },
    foo: {
      children: <></>,
      title: "hey",
      _data: {
        header: "# !foo hey",
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
