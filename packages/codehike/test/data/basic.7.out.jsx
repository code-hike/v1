/*@jsxRuntime automatic @jsxImportSource react*/
export function getHike(props = {}) {
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
    ],
    query: "",
    hero: {
      children: [
        <_components.p>{"foo"}</_components.p>,
        <_components.slot name="foo" />,
        <_components.slot name="quote" index={0} />,
        <_components.slot name="quote" index={1} />,
        <_components.p>{"main"}</_components.p>,
      ],
      query: "3333",
      foo: "bar",
      quote: ["ho", "2"],
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
  return <Hike hike={getHike(props)}></Hike>
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
