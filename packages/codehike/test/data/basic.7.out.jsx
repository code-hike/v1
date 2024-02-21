/*@jsxRuntime automatic @jsxImportSource react*/
export function getBlocks(props = {}) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Hike } = _components
  return {
    children: [
      <_components.p>{"lorem"}</_components.p>,
      <_components.slot name="hero" />,
      <_components.p>{"foo"}</_components.p>,
    ],
    query: "",
    hero: {
      children: [
        <_components.slot name="foo" />,
        <_components.slot name="foo" />,
      ],
      query: "3333",
      foo: {
        children: [<_components.p>{"bax"}</_components.p>],
        query: "baz",
      },
    },
  }
}
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Hike } = _components
  if (!Hike) _missingMdxReference("Hike", true)
  return <Hike hike={getBlocks(props)}></Hike>
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
