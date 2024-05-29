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
    { Foo, Step, Substep } = _components
  if (!Foo) _missingMdxReference("Foo", true)
  if (!Step) _missingMdxReference("Step", true)
  if (!Substep) _missingMdxReference("Substep", true)
  const _blocks = {
    children: _jsxs(_Fragment, {
      children: [
        _jsx(_components.p, {
          children: "hey",
        }),
        _jsx(Foo, {
          title: "y",
          children: _jsx(_components.p, {
            children: "one",
          }),
        }),
        _jsx(Step, {
          title: "x",
          index: 0,
          children: _jsx(_components.p, {
            children: "one",
          }),
        }),
        _jsx(Step, {
          title: "4",
          index: 1,
          children: _jsxs(_Fragment, {
            children: [
              _jsx(_components.p, {
                children: "oned",
              }),
              _jsx(Substep, {
                title: "x3",
                index: 0,
                children: _jsx(_components.p, {
                  children: "ff",
                }),
              }),
            ],
          }),
        }),
      ],
    }),
    title: "",
    _data: {
      header: "",
    },
    Foo: {
      children: _jsx(_components.p, {
        children: "one",
      }),
      title: "y",
      _data: {
        header: "## !Foo y",
      },
    },
    Step: [
      {
        children: _jsx(_components.p, {
          children: "one",
        }),
        title: "x",
        _data: {
          header: "## !!Step x",
        },
        code: {
          value: 'console.log("foo")',
          lang: "js",
          meta: "foo",
        },
      },
      {
        children: _jsxs(_Fragment, {
          children: [
            _jsx(_components.p, {
              children: "oned",
            }),
            _jsx(Substep, {
              title: "x3",
              index: 0,
              children: _jsx(_components.p, {
                children: "ff",
              }),
            }),
          ],
        }),
        title: "4",
        _data: {
          header: "## !!Step 4",
        },
        Substep: [
          {
            children: _jsx(_components.p, {
              children: "ff",
            }),
            title: "x3",
            _data: {
              header: "### !!Substep x3",
            },
          },
        ],
        bar: {
          children: _jsx(_components.p, {
            children: "two",
          }),
          title: "",
          _data: {
            header: "### !bar",
          },
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
