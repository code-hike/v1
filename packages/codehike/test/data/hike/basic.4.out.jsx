/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Hike } = _components
  if (!Hike) _missingMdxReference("Hike", true)
  return (
    <>
      <_components.p>{"hello"}</_components.p>
      {"\n"}
      <Hike
        __hike={{
          children: "",
          title: "",
          _data: {
            header: "",
          },
          x: {
            children: "x",
            title: "1",
            _data: {
              header: "# !x 1",
            },
            s: {
              children: "x.s",
              title: "3",
              _data: {
                header: "## !s 3",
              },
            },
          },
        }}
      >
        <_components.slot path="">
          <_components.slot name="x" />
        </_components.slot>
        <_components.slot path="x">
          <_components.p>{"hey"}</_components.p>
          <_components.slot name="s" />
        </_components.slot>
        <_components.slot path="x.s">
          <_components.p>{"bar"}</_components.p>
        </_components.slot>
      </Hike>
    </>
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
