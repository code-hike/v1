/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
    code: "code",
    p: "p",
    placeholder: "placeholder",
    pre: "pre",
    slot: "slot",
    strong: "strong",
    ...props.components,
  }
  return (
    <Hike>
      <_components.slot>
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
        <_components.slot>
          <_components.pre>
            <_components.code className="language-js">
              {"const a = 1\n"}
            </_components.code>
          </_components.pre>
        </_components.slot>
      </_components.slot>
      <_components.slot name="foo" query="">
        <_components.slot>
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
