/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      h1: "h1",
      p: "p",
      ...props.components,
    },
    { Foo } = _components
  if (!Foo) _missingMdxReference("Foo", true)
  return (
    <>
      <_components.p>{"hello"}</_components.p>
      {"\n"}
      <Foo>
        <_components.p>{"bar"}</_components.p>
        <_components.h1>{"!x 1"}</_components.h1>
        <_components.p>{"hey"}</_components.p>
      </Foo>
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
