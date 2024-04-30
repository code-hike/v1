import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime"
import { CodeWithNotes } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
      a: "a",
      code: "code",
      h2: "h2",
      li: "li",
      p: "p",
      slot: "slot",
      ul: "ul",
      ...props.components,
    },
    { Demo, MyCode } = _components
  if (!Demo) _missingMdxReference("Demo", true)
  if (!MyCode) _missingMdxReference("MyCode", true)
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
      children: _jsxs(_Fragment, {
        children: [
          _jsx(_components.p, {
            children: "Add callouts inside your code blocks.",
          }),
          _jsx(Demo, {
            name: "callout",
          }),
        ],
      }),
      title: "",
      _data: {
        header: "## !demo",
      },
    },
    implementation: {
      children: _jsxs(_Fragment, {
        children: [
          _jsx(CodeWithNotes, {
            children: _jsxs(_Fragment, {
              children: [
                _jsx(_components.slot, {
                  name: "code",
                }),
                _jsx(_components.slot, {
                  name: "notes",
                  index: 0,
                }),
                _jsx(_components.slot, {
                  name: "notes",
                  index: 1,
                }),
              ],
            }),
            title: "",
            _data: {
              header: "",
            },
            code: {
              value:
                'import { InlineAnnotation, AnnotationHandler } from "codehike/code"\r\n\r\nconst callout: AnnotationHandler = {\r\n  name: "callout",\r\n  // !callout[/transform/] transform-annotations\r\n  transform: (annotation: InlineAnnotation) => {\r\n    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation\r\n    return {\r\n      name,\r\n      query,\r\n      fromLineNumber: lineNumber,\r\n      toLineNumber: lineNumber,\r\n      // !callout[/column/] column\r\n      data: { ...data, column: (fromColumn + toColumn) / 2 },\r\n    }\r\n  },\r\n  Block: ({ annotation, children }) => {\r\n    const { column } = annotation.data\r\n    // !fold[/className="(.*?)"/gm]\r\n    return (\r\n      <>\r\n        {children}\r\n        <div\r\n          style={{ minWidth: `${column + 4}ch` }}\r\n          className="w-fit border bg-zinc-800 border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces"\r\n        >\r\n          <div\r\n            style={{ left: `${column}ch` }}\r\n            className="absolute border-l border-t border-current w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-800"\r\n          />\r\n          {annotation.query}\r\n        </div>\r\n      </>\r\n    )\r\n  },\r\n}',
              lang: "tsx",
              meta: "code.tsx",
            },
            notes: [
              {
                children: _jsxs(_components.p, {
                  children: [
                    "We need to transform the annotations from ",
                    _jsx(_components.code, {
                      children: "InlineAnnotation",
                    }),
                    " to ",
                    _jsx(_components.code, {
                      children: "BlockAnnotation",
                    }),
                  ],
                }),
                title: "transform-annotations",
                _data: {
                  header: "## !!notes transform-annotations",
                },
              },
              {
                children: _jsx(_components.p, {
                  children:
                    "This will be the position of the arrow in the callout",
                }),
                title: "column",
                _data: {
                  header: "## !!notes column",
                },
              },
            ],
          }),
          _jsxs(_components.p, {
            children: [
              "Then pass the ",
              _jsx(_components.code, {
                children: "callout",
              }),
              " handler to the ",
              _jsx(_components.code, {
                children: "Pre",
              }),
              " component:",
            ],
          }),
          _jsx(MyCode, {
            codeblock: {
              value:
                'async function Code({ codeblock }: { codeblock: RawCode }) {\r\n  const highlighted = await highlight(codeblock, "github-dark")\r\n  return <Pre code={highlighted} handlers={[callout]} />\r\n}',
              lang: "tsx",
              meta: "code.tsx ln",
            },
          }),
          _jsx(_components.h2, {
            children: "Make it better",
          }),
          _jsx(_components.p, {
            children: "Some ways to improve the callout annotation:",
          }),
          _jsxs(_components.ul, {
            children: [
              "\n",
              _jsx(_components.li, {
                children:
                  "add different annotations with different styles (like Warning, Error, Info, etc)",
              }),
              "\n",
              _jsx(_components.li, {
                children:
                  "add an option to show the callout either before or after the line",
              }),
              "\n",
              _jsxs(_components.li, {
                children: [
                  "put markdown inside the callout (see the ",
                  _jsx(_components.a, {
                    href: "/docs/code/tooltip/",
                    children: "tooltip example",
                  }),
                  ")",
                ],
              }),
              "\n",
            ],
          }),
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
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
