import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"
import { Hike } from "../../src/Hike"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return _jsxs(Hike, {
    foo: "bar",
    children: [
      _jsx(_components.p, {
        children: "Hello world!",
      }),
      _jsx(MyCode, {
        codeblock: {
          value: 'console.log("hello world")\nconsole.log("bye world")',
          lang: "js",
          meta: "my meta",
        },
      }),
      _jsx(MyCode, {
        codeblock: {
          value: "// !Mark(2)",
          lang: "jsonc",
          meta: "THE CUSTOMER OBJECT",
        },
      }),
    ],
  })
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout
    ? _jsx(MDXLayout, {
        ...props,
        children: _jsx(_createMdxContent, {
          ...props,
        }),
      })
    : _createMdxContent(props)
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
