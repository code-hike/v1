/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { CodeWithTooltips } = _components
  if (!CodeWithTooltips) _missingMdxReference("CodeWithTooltips", true)
  return (
    <>
      <_components.p>{"Heaas"}</_components.p>
      {"\n"}
      <CodeWithTooltips
        {...{
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
        }}
      ></CodeWithTooltips>
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
