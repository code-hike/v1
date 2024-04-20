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
      __hike={{
        children: "",
        title: "",
        _data: {
          header: "",
        },
        master: {
          children: "master",
          title: "",
          _data: {
            header: "## !master",
          },
          rings: [
            {
              children: "master.rings",
              title: "Elves",
              _data: {
                header: "### !!rings Elves",
              },
            },
            {
              children: "master.rings",
              title: "Dwarves",
              _data: {
                header: "### !!rings Dwarves",
              },
            },
            {
              children: "master.rings",
              title: "Men",
              _data: {
                header: "### !!rings Men",
              },
            },
          ],
        },
      }}
    >
      <_components.slot path="">
        <>
          <_components.p>{"The Rings of Power"}</_components.p>
          <_components.slot name="master" />
        </>
      </_components.slot>
      <_components.slot path="master">
        <>
          <_components.p>{"The One Ring"}</_components.p>
          <_components.slot name="rings" index={0} />
          <_components.slot name="rings" index={1} />
          <_components.slot name="rings" index={2} />
        </>
      </_components.slot>
      <_components.slot path="master.rings">
        <_components.p>{"Three rings"}</_components.p>
      </_components.slot>
      <_components.slot path="master.rings">
        <_components.p>{"Seven rings"}</_components.p>
      </_components.slot>
      <_components.slot path="master.rings">
        <_components.p>{"Nine rings"}</_components.p>
      </_components.slot>
    </MyComponent>
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
