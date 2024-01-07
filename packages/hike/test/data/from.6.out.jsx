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
          code={"x = 3\nx = 4\nx = 5"}
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
              name: "from",
              query: "./z.js 3:5",
              ranges: [
                {
                  fromLineNumber: 1,
                  toLineNumber: 1,
                },
              ],
            },
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
            {
              name: "Line",
              query: "3",
              ranges: [
                {
                  fromLineNumber: 3,
                  toLineNumber: 3,
                },
              ],
            },
          ]}
        />
      </_components.slot>
      <_components.slot name="code" query>
        <_components.slot
          role="code"
          lang="py"
          meta="python meta"
          code={"print(1)\nprint(2)"}
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
              name: "from",
              query: "./z.py",
              ranges: [
                {
                  fromLineNumber: 1,
                  toLineNumber: 1,
                },
              ],
            },
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
