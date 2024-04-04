/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      slot: "slot",
      ...props.components,
    },
    { Hike } = _components
  if (!Hike) _missingMdxReference("Hike", true)
  return (
    <Hike
      __hike={{
        children: "",
        title: "",
        _data: {
          header: "",
        },
        code: [
          {
            value:
              "object Main {\r\n  def factorial(n: Int): Int = {\r\n    if (n == 0) {\r\n      return 1\r\n    } else {\r\n      return n * factorial(n - 1)\r\n    }\r\n  }\r\n}",
            lang: "scala",
            meta: "",
          },
          {
            value:
              "def factorial(n):\r\n    if n == 0:\r\n        return 1\r\n    else:\r\n        return n * factorial(n - 1)",
            lang: "python",
            meta: "",
          },
        ],
      }}
    >
      <_components.slot path="">
        <_components.slot name="code" index={0} />
        <_components.slot name="code" index={1} />
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
