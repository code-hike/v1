/*@jsxRuntime automatic @jsxImportSource react*/
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
  return (
    <_components.slot
      __hike={{
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
      }}
    >
      <_components.slot path="">
        <>
          <_components.p>{"hey"}</_components.p>
          <Foo title="y">
            <_components.p>{"one"}</_components.p>
          </Foo>
          <Step title="x" index={0}>
            <_components.p>{"one"}</_components.p>
          </Step>
          <Step title="4" index={1}>
            <>
              <_components.p>{"oned"}</_components.p>
              <Substep title="x3" index={0}>
                <_components.p>{"ff"}</_components.p>
              </Substep>
            </>
          </Step>
        </>
      </_components.slot>
      <_components.slot path="Foo">
        <_components.p>{"one"}</_components.p>
      </_components.slot>
      <_components.slot path="Step">
        <_components.p>{"one"}</_components.p>
      </_components.slot>
      <_components.slot path="Step">
        <>
          <_components.p>{"oned"}</_components.p>
          <Substep title="x3" index={0}>
            <_components.p>{"ff"}</_components.p>
          </Substep>
        </>
      </_components.slot>
      <_components.slot path="Step.Substep">
        <_components.p>{"ff"}</_components.p>
      </_components.slot>
      <_components.slot path="Step.bar">
        <_components.p>{"two"}</_components.p>
      </_components.slot>
    </_components.slot>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
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
