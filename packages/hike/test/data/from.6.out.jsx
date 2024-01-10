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
    <Hike>
      <_components.slot role="children">
        <_components.p>{"Hello!"}</_components.p>
        <_components.placeholder name="code" />
        <_components.placeholder name="code" />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="js"
          meta="my meta"
          parentPath="C:\p\dev\v1\packages\hike\test\data\from.0.mdx"
          code={"// !from ./z.js 3:5"}
        />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="py"
          meta="python meta"
          parentPath="C:\p\dev\v1\packages\hike\test\data\from.0.mdx"
          code={"# !from ./z.py"}
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
