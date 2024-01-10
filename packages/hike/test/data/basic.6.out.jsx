/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    placeholder: "placeholder",
    slot: "slot",
    strong: "strong",
    ...props.components,
  }
  return (
    <Hike>
      <_components.slot role="children">
        <_components.p>
          {"Hello "}
          <_components.strong>{"world"}</_components.strong>
          {"!"}
        </_components.p>
        <_components.placeholder name="code" />
        <_components.p>{"More"}</_components.p>
        <_components.placeholder name="foo" />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="js"
          meta
          parentPath="C:\p\dev\v1\packages\hike\test\data\basic.0.mdx"
          code={"const a = 1"}
        />
      </_components.slot>
      <_components.slot name="foo" query="">
        <_components.slot role="children">
          <_components.p>{"bar"}</_components.p>
        </_components.slot>
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
