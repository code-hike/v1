import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"
import { x } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  const _blocks = {
    children: undefined,
    title: "",
    _data: {
      header: "",
    },
    demo: {
      children: _jsx(_components.p, {
        children: "Add callouts inside your code blocks.",
      }),
      title: "",
      _data: {
        header: "## !demo",
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
