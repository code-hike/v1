import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime"
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    ...props.components,
  }
  return _jsxs(_Fragment, {
    children: [
      _jsx(_components.h2, {
        children: "Hello world",
      }),
      "\n",
      _jsx("foo", {
        x: {
          yyy: undefined,
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
