import { MyLayout } from "./my-layout"

function MDXContent() {
  return (
    <>
      <h1>Hello World</h1>
      <MyLayout
        data={{
          children: <p>zero</p>,
        }}
      />
    </>
  )
}
