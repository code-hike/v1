/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      h2: "h2",
      p: "p",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return (
    <>
      <_components.h2>{"Hello world"}</_components.h2>
      {"\n"}
      <_components.p>{"Shouldn't add any code hike stuff."}</_components.p>
      {"\n"}
      <MyCode
        codeblock={{
          type: "code",
          lang: "js",
          meta: null,
          value: "// !Foo\r\nconsole.log(1)",
          position: {
            start: {
              line: 5,
              column: 1,
              offset: 56,
            },
            end: {
              line: 8,
              column: 4,
              offset: 91,
            },
          },
        }}
      />
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
