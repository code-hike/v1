import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime"
function _createMdxContent(props) {
  const _components = {
      h2: "h2",
      p: "p",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return _jsxs(_Fragment, {
    children: [
      _jsx(_components.h2, {
        children: "Hello world",
      }),
      "\n",
      _jsx(_components.p, {
        children: "Shouldn't add any code hike stuff.",
      }),
      "\n",
      _jsx(MyCode, {
        codeblock: {
          value: "// !Foo\nconsole.log(1)",
          lang: "js",
          meta: "",
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
