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
  return _jsxs(_components.slot, {
    children: _jsx(_components.slot, {
      path: "",
      children: _jsxs(_Fragment, {
        children: [
          _jsx(_components.p, {
            children: "hello",
          }),
          _jsx(_components.slot, {
            name: "foo",
          }),
          _jsx(_components.p, {
            children: "hey",
          }),
        ],
      }),
    }),
    title: "",
    _data: {
      header: "",
    },
    foo: {
      children: _jsx(_components.slot, {
        path: "",
        children: _jsxs(_Fragment, {
          children: [
            _jsx(_components.p, {
              children: "hello",
            }),
            _jsx(_components.slot, {
              name: "foo",
            }),
            _jsx(_components.p, {
              children: "hey",
            }),
          ],
        }),
      }),
      title: "hey",
      _data: {
        header: "# !foo hey",
      },
    },
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
