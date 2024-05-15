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
  }
  const _blocks = {
    children: _jsxs(_Fragment, {
      children: [
        _jsx(_components.slot, {
          name: "demo",
        }),
        _jsx(_components.slot, {
          name: "implementation",
        }),
      ],
    }),
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
    implementation: {
      children: _jsx(CodeWithNotes, {
        children: _jsxs(_Fragment, {
          children: [
            _jsx(_components.slot, {
              name: "code",
            }),
            _jsx(_components.slot, {
              name: "notes",
              index: 0,
            }),
          ],
        }),
        title: "",
        _data: {
          header: "",
        },
        code: {
          value: "console",
          lang: "tsx",
          meta: "code.tsx",
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
      }),
      title: "",
      _data: {
        header: "## !implementation",
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
