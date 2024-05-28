import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime"
import { CodeWithNotes } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
      p: "p",
      slot: "slot",
      ...props.components,
    },
    { Demo } = _components
  if (!Demo) _missingMdxReference("Demo", true)
  const _blocks = {
    children: _jsx(_Fragment, {
      children: _jsx(Demo, {
        name: "Demo",
      }),
    }),
    title: "",
    _data: {
      header: "",
    },
    Demo: {
      children: _jsx(_components.p, {
        children: "Add callouts inside your code blocks.",
      }),
      title: "",
      _data: {
        header: "## !Demo",
      },
    },
    implementation: {
      children: _jsx(_components.p, {
        children: "foo",
      }),
      title: "",
      _data: {
        header: "## !implementation",
      },
    },
    notes: [
      {
        children: _jsx(_components.p, {
          children: "y",
        }),
        title: "x",
        _data: {
          header: "## !!notes x",
        },
      },
    ],
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
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
