/*@jsxRuntime automatic @jsxImportSource react*/
export function getHike(props) {
  const _components = {
      h2: "h2",
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Foo, Hike } = _components
  if (!Foo) _missingMdxReference("Foo", true)
  if (!Hike) _missingMdxReference("Hike", true)
  return {
    query: "",
    children: [
      <_components.p>{"This is something\r\nMore"}</_components.p>,
      <Foo x={2} />,
      <_components.slot name="hero" index={0} />,
    ],
    hero: [
      {
        query: "3333",
        children: [
          <_components.p>{"foo"}</_components.p>,
          <_components.slot name="foo" index={0} />,
          <_components.p>{"more"}</_components.p>,
          <_components.slot name="foo" index={1} />,
        ],
        foo: [
          {
            query: "first",
            children: [<_components.slot name="screenshot" />],
            screenshot: {
              alt: "foo",
              title: "Some title",
              url: "http://www.google.com",
            },
          },
          {
            query: "second",
            children: [
              <_components.p>{"hey two"}</_components.p>,
              <_components.h2 />,
            ],
          },
        ],
      },
    ],
  }
}
function _createMdxContent(props) {
  const _components = {
      h2: "h2",
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Foo, Hike } = _components
  if (!Foo) _missingMdxReference("Foo", true)
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
