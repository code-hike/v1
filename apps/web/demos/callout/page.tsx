import {
  RawCode,
  Pre,
  highlight,
  BlockAnnotationComponent,
  InlineAnnotation,
} from "codehike/code"
import Content from "./content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

type CodeComponent = (props: { codeblock: RawCode }) => Promise<JSX.Element>

const Code: CodeComponent = async ({ codeblock }) => {
  const highlighted = await highlight(codeblock, "github-dark")

  highlighted.annotations = highlighted.annotations.map((annotation) => {
    if (annotation.name != "Callout") {
      return annotation
    }
    const { name, query, lineNumber, fromColumn, toColumn } =
      annotation as InlineAnnotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { column: (fromColumn + toColumn) / 2 },
    }
  })

  return (
    <Pre
      className="m-0 bg-zinc-950"
      code={highlighted}
      components={{ BlockCallout }}
    />
  )
}

const BlockCallout: BlockAnnotationComponent = ({ annotation, children }) => {
  const { column } = annotation.data
  return (
    <>
      {children}
      <div
        style={{ minWidth: `${column + 4}ch` }}
        className={
          "w-fit border bg-zinc-800 border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces"
        }
      >
        <div
          style={{ left: `${column}ch` }}
          className="absolute border-l border-t border-current w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-800"
        />
        {annotation.query}
      </div>
    </>
  )
}
