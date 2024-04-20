/*@jsxRuntime automatic @jsxImportSource react*/
import { MyComponent } from "./my-component"
function _createMdxContent(props) {
  const _components = {
    p: "p",
    slot: "slot",
    ...props.components,
  }
  return (
    <MyComponent
      {...{
        children: (
          <>
            <_components.p>{"The Rings of Power"}</_components.p>
            <_components.slot name="master" />
          </>
        ),
        title: "",
        _data: {
          header: "",
        },
        master: {
          children: (
            <>
              <_components.p>{"The One Ring"}</_components.p>
              <_components.slot name="rings" index={0} />
              <_components.slot name="rings" index={1} />
              <_components.slot name="rings" index={2} />
            </>
          ),
          title: "",
          _data: {
            header: "## !master",
          },
          rings: [
            {
              children: <_components.p>{"Three rings"}</_components.p>,
              title: "Elves",
              _data: {
                header: "### !!rings Elves",
              },
            },
            {
              children: <_components.p>{"Seven rings"}</_components.p>,
              title: "Dwarves",
              _data: {
                header: "### !!rings Dwarves",
              },
            },
            {
              children: <_components.p>{"Nine rings"}</_components.p>,
              title: "Men",
              _data: {
                header: "### !!rings Men",
              },
            },
          ],
        },
      }}
    ></MyComponent>
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
