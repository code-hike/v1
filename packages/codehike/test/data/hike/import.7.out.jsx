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
      <_components.p>{"hello"}</_components.p>,
      <MyCode
        codeblock={{
          type: "code",
          lang: "py",
          meta: null,
          value:
            "import random\r\n\r\nmy_list = [1, 'a', 32, 'c', 'd', 31]\r\nprint(random.choice(my_list))",
          position: {
            start: {
              line: 3,
              column: 1,
              offset: 9,
            },
            end: {
              line: 5,
              column: 4,
              offset: 36,
            },
          },
        }}
      />,
      <_components.slot name="code" />,
    ],
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
  if (props._returnBlocks) {
    return getBlocks(props)
  }
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
