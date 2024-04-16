/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = {
      code: "code",
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { CodeWithNotes } = _components
  if (!CodeWithNotes) _missingMdxReference("CodeWithNotes", true)
  return (
    <>
      <_components.p>{"hello"}</_components.p>
      {"\n"}
      <CodeWithNotes
        __hike={{
          children: "",
          title: "",
          _data: {
            header: "",
          },
          code: {
            value: 'console.log("Hello, World!")',
            lang: "tsx",
            meta: "code.tsx",
          },
          notes: [
            {
              children: "notes",
              title: "transform-annotations",
              _data: {
                header: "## !!notes transform-annotations",
              },
            },
            {
              children: "notes",
              title: "column",
              _data: {
                header: "## !!notes column",
              },
            },
          ],
        }}
      >
        <_components.slot path="">
          <>
            <_components.slot name="code" />
            <_components.slot name="notes" index={0} />
            <_components.slot name="notes" index={1} />
          </>
        </_components.slot>
        <_components.slot path="notes">
          <_components.p>
            {"We need to transform the "}
            <_components.code>{"Callout"}</_components.code>
            {" annotations from "}
            <_components.code>{"InlineAnnotation"}</_components.code>
            {" to "}
            <_components.code>{"BlockAnnotation"}</_components.code>
          </_components.p>
        </_components.slot>
        <_components.slot path="notes">
          <_components.p>
            {"We store the "}
            <_components.code>{"column"}</_components.code>
            {" in the annotation data"}
          </_components.p>
        </_components.slot>
      </CodeWithNotes>
      {"\n"}
      <_components.p>{"hey"}</_components.p>
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
