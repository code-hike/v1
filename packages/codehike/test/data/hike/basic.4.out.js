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
  return _jsxs(_components.slot, {
    __hike: {
      children: "",
      title: "",
      _data: {
        header: "",
      },
      Foo: {
        children: "Foo",
        title: "y",
        _data: {
          header: "## !Foo y",
        },
      },
      Step: [
        {
          children: "Step",
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
          children: "Step",
          title: "4",
          _data: {
            header: "## !!Step 4",
          },
          Substep: [
            {
              children: "Step.Substep",
              title: "x3",
              _data: {
                header: "### !!Substep x3",
              },
            },
          ],
          bar: {
            children: "Step.bar",
            title: "",
            _data: {
              header: "### !bar",
            },
          },
        },
      ],
    },
    children: [
      _jsx(_components.slot, {
        path: "",
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
      }),
      _jsx(_components.slot, {
        path: "Foo",
        children: _jsx(_components.p, {
          children: "one",
        }),
      }),
      _jsx(_components.slot, {
        path: "Step",
        children: _jsx(_components.p, {
          children: "one",
        }),
      }),
      _jsx(_components.slot, {
        path: "Step",
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
      _jsx(_components.slot, {
        path: "Step.Substep",
        children: _jsx(_components.p, {
          children: "ff",
        }),
      }),
      _jsx(_components.slot, {
        path: "Step.bar",
        children: _jsx(_components.p, {
          children: "two",
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
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
