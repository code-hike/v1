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
      implementation: {
        children: "implementation",
        title: "",
        _data: {
          header: "## !implementation",
        },
      },
    },
    children: [
      _jsx(_components.slot, {
        path: "",
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
      }),
      _jsx(_components.slot, {
        path: "demo",
        children: _jsx(_components.p, {
          children: "Add callouts inside your code blocks.",
        }),
      }),
      _jsx(_components.slot, {
        path: "implementation",
        children: _jsxs(CodeWithNotes, {
          __hike: {
            children: "",
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
                children: "notes",
                title: "x",
                _data: {
                  header: "## !!notes x",
                },
              },
            ],
          },
          children: [
            _jsx(_components.slot, {
              path: "",
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
            }),
            _jsx(_components.slot, {
              path: "notes",
              children: _jsx(_components.p, {
                children: "y",
              }),
            }),
          ],
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
