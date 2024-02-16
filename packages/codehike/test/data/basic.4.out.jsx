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
    <Hike
      __hike={{
        children: "",
        query: "",
        hero: {
          children: "hero",
          query: "3333",
        },
      }}
    >
      <_components.slot path="">
        <_components.p>{"lorem"}</_components.p>
        <_components.slot name="hero" />
      </_components.slot>
      <_components.slot path="hero">
        <_components.p>{"foo"}</_components.p>
        <_components.p>{"main"}</_components.p>
      </_components.slot>
    </Hike>
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
