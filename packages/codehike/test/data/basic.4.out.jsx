/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Hike, MyCode } = _components
  if (!Hike) _missingMdxReference("Hike", true)
  if (!MyCode) _missingMdxReference("MyCode", true)
  return (
    <Hike
      __hike={{
        children: "",
        query: "",
        _data: {
          header: "",
        },
        hero: {
          children: "hero",
          query: "3333",
          _data: {
            header: "# !hero 3333",
          },
          foo: [
            {
              children: "hero.foo",
              query: "bar",
              _data: {
                header: "## !!foo bar",
              },
            },
            {
              children: "hero.foo",
              query: "baz",
              _data: {
                header: "## !!foo baz",
              },
              hey: "11 11",
              one: ["333", "444"],
            },
          ],
        },
      }}
    >
      <_components.slot path="">
        <_components.p>{"lorem"}</_components.p>
        <_components.slot name="hero" />
        <_components.p>{"foo"}</_components.p>
      </_components.slot>
      <_components.slot path="hero">
        <_components.slot name="foo" index={0} />
        <_components.slot name="foo" index={1} />
      </_components.slot>
      <_components.slot path="hero.foo">
        <_components.p>{"bax"}</_components.p>
        <MyCode
          codeblock={{
            value: "x = 3\r\nx = 4\r\nx = 5\r",
            lang: "js",
            meta: "foo.js",
          }}
        />
      </_components.slot>
      <_components.slot path="hero.foo">
        <_components.p>{"3"}</_components.p>
        <_components.slot name="hey" />
        <_components.slot name="one" index={0} />
        <_components.slot name="one" index={1} />
        <_components.p>{"asdasdf"}</_components.p>
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
