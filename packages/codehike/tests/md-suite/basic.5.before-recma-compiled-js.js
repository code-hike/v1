import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime"
function _createMdxContent(props) {
  const _components = {
    slot: "slot",
    ...props.components,
  }
  return _jsx(_components.slot, {
    __hike: {
      children: "",
      title: "",
      _data: {
        header: "",
      },
      hello: "world",
    },
    children: _jsx(_components.slot, {
      path: "",
      children: _jsx(_Fragment, {}),
    }),
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
