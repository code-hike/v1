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
      <_components.p>{"ho"}</_components.p>,
      <_components.slot name="foo" />,
    ],
    title: "",
    _data: {
      header: "",
    },
    foo: {
      children: [<_components.p>{"bax"}</_components.p>],
      title: "bar",
      _data: {
        header: "# !foo bar",
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
