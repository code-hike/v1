/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    placeholder: "placeholder",
    slot: "slot",
    ...props.components,
  }
  return (
    <Hike foo={"bar"}>
      <_components.slot role="children">
        <_components.p>{"Hello world!"}</_components.p>
        <_components.placeholder name="code" />
        <_components.placeholder name="code" />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="js"
          meta="my meta"
          parentPath="C:\p\dev\v1\packages\hike\test\data\code.0.mdx"
          code={'console.log("hello world")\r\nconsole.log("bye world")'}
        />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="jsonc"
          meta="THE CUSTOMER OBJECT"
          parentPath="C:\p\dev\v1\packages\hike\test\data\code.0.mdx"
          code={"// !Mark(2)"}
        />
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
