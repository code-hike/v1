/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  const _blocks = {
    children: (
      <>
        <_components.p>{"hello"}</_components.p>
        <MyCode
          codeblock={{
            value:
              "import random\r\n\r\nmy_list = [1, 'a', 32, 'c', 'd', 31]\r\nprint(random.choice(my_list))",
            lang: "py",
            meta: "",
          }}
        />
        <_components.slot name="code" />
      </>
    ),
    title: "",
    _data: {
      header: "",
    },
    code: {
      value:
        "import random\r\n\r\nmy_list = [1, 'a', 32, 'c', 'd', 31]\r\nprint(random.choice(my_list))",
      lang: "py",
      meta: "",
    },
  }
  if (props._returnBlocks) {
    return _blocks
  }
  return _blocks.children
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
