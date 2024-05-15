/*@jsxRuntime automatic @jsxImportSource react*/
import { CodeWithNotes } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return (
    <_components.slot
      __hike={{
        children: "",
        title: "",
        _data: {
          header: "",
        },
        demo: {
          children: "demo",
          title: "",
          _data: {
            header: "## !demo",
          },
        },
        implementation: {
          children: "implementation",
          title: "",
          _data: {
            header: "## !implementation",
          },
        },
      }}
    >
      <_components.slot path="">
        <>
          <_components.slot name="demo" />
          <_components.slot name="implementation" />
        </>
      </_components.slot>
      <_components.slot path="demo">
        <_components.p>{"Add callouts inside your code blocks."}</_components.p>
      </_components.slot>
      <_components.slot path="implementation">
        <CodeWithNotes
          __hike={{
            children: "",
            title: "",
            _data: {
              header: "",
            },
            code: {
              value: "console",
              lang: "tsx",
              meta: "code.tsx",
            },
            notes: [
              {
                children: "notes",
                title: "x",
                _data: {
                  header: "## !!notes x",
                },
              },
            ],
          }}
        >
          <_components.slot path="">
            <>
              <_components.slot name="code" />
              <_components.slot name="notes" index={0} />
            </>
          </_components.slot>
          <_components.slot path="notes">
            <_components.p>{"y"}</_components.p>
          </_components.slot>
        </CodeWithNotes>
      </_components.slot>
    </_components.slot>
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
