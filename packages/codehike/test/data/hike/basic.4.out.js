import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { CodeWithTooltips } = _components
  if (!CodeWithTooltips) _missingMdxReference("CodeWithTooltips", true)
  return _jsxs(_Fragment, {
    children: [
      _jsx(_components.p, {
        children: "Heaas",
      }),
      "\n",
      _jsxs(CodeWithTooltips, {
        __hike: {
          children: "",
          title: "",
          _data: {
            header: "",
          },
          foo: {
            children: "foo",
            title: "bar",
            _data: {
              header: "## !foo bar",
            },
          },
        },
        children: [
          _jsx(_components.slot, {
            path: "",
            children: _jsxs(_Fragment, {
              children: [
                _jsx(_components.p, {
                  children: "hey",
                }),
                _jsx(_components.slot, {
                  name: "foo",
                }),
              ],
            }),
          }),
          _jsx(_components.slot, {
            path: "foo",
            children: _jsx(_components.p, {
              children: "bin",
            }),
          }),
        ],
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
