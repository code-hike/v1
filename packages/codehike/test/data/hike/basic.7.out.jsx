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
              <_components.p>{"fasdfas"}</_components.p>
              <_components.slot name="code" />
              <_components.slot name="foo" />
              <_components.slot name="bar" />
            </>
          ),
          title: "",
          _data: {
            header: "",
          },
          code: {
            value:
              "function lorem(ipsum, dolor = 1) {\r\n  const sit = ipsum == null ? 0 : ipsum.sit\r\n  // !mark(1:2)\r\n  dolor = sit - amet(dolor)\r\n  return sit ? consectetur(ipsum) : []\r\n}",
            lang: "js",
            meta: "",
          },
          foo: {
            children: <_components.p>{"Hello"}</_components.p>,
            title: "",
            _data: {
              header: "## !foo",
            },
          },
          bar: {
            children: <_components.p>{"World"}</_components.p>,
            title: "",
            _data: {
              header: "## !bar",
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
