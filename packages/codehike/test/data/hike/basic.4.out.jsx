/*@jsxRuntime automatic @jsxImportSource react*/
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
        foo: {
          children: "foo",
          title: "",
          _data: {
            header: "# !foo",
          },
        },
      }}
    >
      <_components.slot path="">
        <_components.slot name="foo" />
      </_components.slot>
      <_components.slot path="foo">
        <_components.p>{"bar"}</_components.p>
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
