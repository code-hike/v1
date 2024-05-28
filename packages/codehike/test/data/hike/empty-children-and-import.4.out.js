import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"
import { x } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return _jsxs(_components.slot, {
    __hike: {
      children: "",
      title: "",
      _data: {
        header: "",
      },
      demo: {
        children: "demo",
        title: "",
        _data: {
          header: "## !demo",
        },
      },
    },
    children: [
      _jsx(_components.slot, {
        path: "",
      }),
      _jsx(_components.slot, {
        path: "demo",
        children: _jsx(_components.p, {
          children: "Add callouts inside your code blocks.",
        }),
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
