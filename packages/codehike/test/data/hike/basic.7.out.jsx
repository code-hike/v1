/*@jsxRuntime automatic @jsxImportSource react*/
import { CodeWithNotes } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  const _blocks = {
    children: (
      <>
        <_components.slot name="demo" />
        <_components.slot name="implementation" />
      </>
    ),
    title: "",
    _data: {
      header: "",
    },
    demo: {
      children: (
        <_components.p>{"Add callouts inside your code blocks."}</_components.p>
      ),
      title: "",
      _data: {
        header: "## !demo",
      },
    },
    implementation: {
      children: (
        <CodeWithNotes
          {...{
            children: (
              <>
                <_components.slot name="code" />
                <_components.slot name="notes" index={0} />
              </>
            ),
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
                children: <_components.p>{"y"}</_components.p>,
                title: "x",
                _data: {
                  header: "## !!notes x",
                },
              },
            ],
          }}
        ></CodeWithNotes>
      ),
      title: "",
      _data: {
        header: "## !implementation",
      },
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
