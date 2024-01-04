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
          code={'console.log("hello world")\nconsole.log("bye world")'}
          annotations={[
            {
              name: "Line",
              query: "1",
              ranges: [
                {
                  fromLineNumber: 1,
                  toLineNumber: 1,
                },
              ],
            },
            {
              name: "Line",
              query: "2",
              ranges: [
                {
                  fromLineNumber: 2,
                  toLineNumber: 2,
                },
              ],
            },
          ]}
        />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="jsonc"
          meta="THE CUSTOMER OBJECT"
          code={""}
          annotations={[
            {
              name: "Line",
              query: "1",
              ranges: [
                {
                  fromLineNumber: 1,
                  toLineNumber: 1,
                },
              ],
            },
            {
              name: "Mark",
              query: "",
              ranges: [
                {
                  fromLineNumber: 2,
                  toLineNumber: 2,
                },
              ],
            },
          ]}
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
