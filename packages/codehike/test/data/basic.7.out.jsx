/*@jsxRuntime automatic @jsxImportSource react*/
export function getBlocks(props = {}) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Hike, MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return {
    children: [
      <_components.p>{"lorem"}</_components.p>,
      <_components.slot name="hero" />,
      <_components.p>{"foo"}</_components.p>,
    ],
    query: "",
    hero: {
      children: [
        <_components.slot name="foo" index={0} />,
        <_components.slot name="foo" index={1} />,
      ],
      query: "3333",
      foo: [
        {
          children: [
            <_components.p>{"bax"}</_components.p>,
            <MyCode
              codeblock={{
                value: "x = 3\r\nx = 4\r\nx = 5\r",
                lang: "js",
                meta: "foo.js",
              }}
            />,
          ],
          query: "bar",
        },
        {
          children: [
            <_components.p>{"3"}</_components.p>,
            <_components.slot name="hey" />,
            <_components.slot name="one" index={0} />,
            <_components.slot name="one" index={1} />,
            <_components.p>{"asdasdf"}</_components.p>,
          ],
          query: "baz",
          hey: "11 11",
          one: ["333", "444"],
        },
      ],
    },
  }
}
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Hike, MyCode } = _components
  if (!Hike) _missingMdxReference("Hike", true)
  if (!MyCode) _missingMdxReference("MyCode", true)
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
