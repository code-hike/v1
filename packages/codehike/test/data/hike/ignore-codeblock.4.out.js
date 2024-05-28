import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime"
function _createMdxContent(props) {
  const _components = {
      code: "code",
      p: "p",
      pre: "pre",
      ...props.components,
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return _jsxs(_Fragment, {
    children: [
      _jsx(_components.p, {
        children: "hey",
      }),
      "\n",
      _jsx(_components.pre, {
        children: _jsx(_components.code, {
          className: "language-mermaid",
          children:
            "graph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;\n",
        }),
      }),
      "\n",
      _jsx(MyCode, {
        codeblock: {
          value: "console.log(2)",
          lang: "javascript",
          meta: "index.js",
          code: "console.log(2)",
          tokens: [
            ["console.", "#C9D1D9"],
            ["log", "#D2A8FF"],
            ["(", "#C9D1D9"],
            ["2", "#79C0FF"],
            [")", "#C9D1D9"],
          ],
          annotations: [],
          themeName: "github-dark",
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
