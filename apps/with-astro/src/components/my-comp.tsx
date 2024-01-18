import React from "react"
import FooContent from "./foo.mdx"

export function MyComp(props) {
  console.log(props.title)
  return <div>{props.title.props.children}</div>
}

function Foo({ hike }) {
  return <div>{hike.children}</div>
}
