/*@jsxRuntime automatic @jsxImportSource react*/
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    strong: "strong",
    ...props.components,
  }
  return (
    <Hike
      hike={{
        query: "",
        children: [
          <_components.p>
            {"Hello "}
            <_components.strong>{"world"}</_components.strong>
            {"!"}
          </_components.p>,
          <_components.slot name="code" />,
          <_components.p>{"More"}</_components.p>,
          <_components.slot name="foo" />,
        ],
        code: [
          {
            value: "const a = 1\r\nconst b = 1",
            lang: "js",
            meta: null,
          },
        ],
        foo: [
          {
            query: "",
            children: [
              <_components.p>{"bar"}</_components.p>,
              <_components.slot name="lorem" />,
              <_components.slot name="lorem" />,
              <_components.slot name="dolor" />,
              <_components.p>{"bar 2"}</_components.p>,
            ],
            lorem: [
              {
                query: "ipsum",
                children: [<_components.p>{"lorem"}</_components.p>],
              },
              {
                query: "ipsum",
                children: [<_components.p>{"lorem 2"}</_components.p>],
              },
            ],
            dolor: [
              {
                query: "sit amet",
                children: [<_components.p>{"dolor"}</_components.p>],
              },
            ],
          },
        ],
      }}
    ></Hike>
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
