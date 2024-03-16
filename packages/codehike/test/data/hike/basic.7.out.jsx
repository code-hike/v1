/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const { MyCode } = props.components || {}
  if (!MyCode) _missingMdxReference("MyCode", true)
  return (
    <MyCode
      codeblock={{
        value:
          "console.log(1)\n// !Mark m1\nfunction x() {\n  // !Mark[3:4] m2\n  return 4\n}",
        lang: "js",
        meta: "foo.js",
      }}
    />
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
