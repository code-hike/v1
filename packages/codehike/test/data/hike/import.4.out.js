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
    },
    { MyCode } = _components
  if (!MyCode) _missingMdxReference("MyCode", true)
  return _jsx(_components.slot, {
    __hike: {
      children: "",
      title: "",
      _data: {
        header: "",
      },
      code: {
        value:
          "import random\n\nmy_list = [1, 'a', 32, 'c', 'd', 31]\nprint(random.choice(my_list))",
        lang: "py",
        meta: "",
      },
    },
    children: _jsx(_components.slot, {
      path: "",
      children: _jsxs(_Fragment, {
        children: [
          _jsx(_components.p, {
            children: "hello",
          }),
          _jsx(MyCode, {
            codeblock: {
              value:
                "import random\n\nmy_list = [1, 'a', 32, 'c', 'd', 31]\nprint(random.choice(my_list))",
              lang: "py",
              meta: "",
            },
          }),
          _jsx(_components.slot, {
            name: "code",
          }),
        ],
      }),
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
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
