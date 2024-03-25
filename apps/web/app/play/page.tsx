import React, { FunctionComponent } from "react"
import { Callout } from "./callout"

export default function Playground() {
  console.log("------------")

  const components = {
    HiddenLine,
    Callout,
    ClassName,
    Line: FinalLine,
  }
  console.log(components)
  const annotations = [
    {
      name: "HiddenLine",
      query: "",
    },
    {
      name: "ClassName",
      query: "bg-green-500",
    },
    {
      name: "Callout",
      query: "Hello World!",
    },
  ]

  return (
    <AnnotatedLine
      annotations={annotations}
      accumulatedProps={{}}
      newProps={{ children: "TheLine", lineNumber: 1 }}
      components={components}
    />
  )
}

function AnnotatedLine({
  annotations,
  accumulatedProps,
  newProps,
  components,
}: any) {
  const { Line } = components

  // clone stack
  const stack = annotations.slice()
  let name = "StackLine"
  let C: React.FunctionComponent = (props: any) => {
    const mprops = merge(newProps, props)
    console.log("Line", newProps, props, mprops)
    return <Line {...mprops} />
  }
  C.displayName = name
  while (stack.length > 0) {
    const annotation = stack.shift()
    name += annotation.name
    const Component = components[annotation.name]
    const SubLine = C.bind(null)
    SubLine.displayName = name
    C = (props: any) => {
      const mprops = merge(newProps, props)
      console.log(annotation.name, newProps, props, mprops)
      return <Component {...mprops} Line={SubLine} annotation={annotation} />
    }
  }
  return C(newProps)
}

function LineStack({
  annotations,
  accumulatedProps,
  newProps,
  components,
}: any) {
  const mergedProps = merge(accumulatedProps, newProps)
  const [annotation, ...rest] = annotations

  console.log({
    name: annotation?.name,
    accumulatedProps,
    newProps,
    mergedProps,
  })
  if (!annotation) {
    return <FinalLine {...mergedProps} />
  }

  const Component = components[annotation.name]

  const props = {
    ...mergedProps,
    annotation,
    Line: (props: any) => (
      <LineStack
        annotations={rest}
        accumulatedProps={mergedProps}
        newProps={props}
        components={components}
      />
    ),
  }

  return <Component {...props} />
}

function merge(p1: any, p2: any) {
  const result = { ...p1, ...p2, children: p2.children || p1.children }
  return result
}

function FinalLine({ lineNumber, ...props }: any) {
  console.log("FinalLine", props)
  return <div data-line={lineNumber} {...props} />
}

function HiddenLine({ Line, annotation, ...props }: any) {
  const { query } = annotation
  if (query === "hidden") {
    return null
  } else {
    return <Line {...props} data-foo="bar" />
  }
}

function ClassName({ Line, annotation, ...props }: any) {
  const { query } = annotation
  return (
    <>
      <input />
      <Line {...props} className={query} />
    </>
  )
}
