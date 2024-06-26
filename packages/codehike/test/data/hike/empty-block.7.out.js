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
  }
  const _blocks = {
    children: _jsxs(_Fragment, {
      children: [
        _jsx(_components.p, {
          children: "hello",
        }),
        _jsx(_components.p, {
          children: "hey",
        }),
      ],
    }),
    title: "",
    _data: {
      header: "",
    },
    foo: {
      children: _jsx(_Fragment, {}),
      title: "hey",
      _data: {
        header: "# !foo hey",
      },
    },
  }
  if (props._returnBlocks) {
    return _blocks
  }
  return _blocks.children
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
