import {
  BlockAnnotationComponent,
  CodeAnnotation,
  InlineAnnotation,
} from "codehike/code"

export function transformCallouts(
  annotations: CodeAnnotation[],
): CodeAnnotation[] {
  return annotations.map((annotation) => {
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
}

export const BlockCallout: BlockAnnotationComponent = ({
  annotation,
  children,
}) => {
  const { column } = annotation.data
  return (
    <>
      <div
        style={{ minWidth: `${column + 4}ch` }}
        className="w-fit border bg-zinc-800 border-zinc-200/50 rounded px-2 relative ml-[7ch] my-2 whitespace-break-spaces prose-p:my-1"
      >
        <div
          style={{ left: `${column}ch` }}
          className="absolute border-r border-b  border-zinc-200/50 w-2 h-2 rotate-45 translate-y-1/2 -bottom-[1px] bg-zinc-800"
        />
        {annotation.data.children || annotation.query}
      </div>
      {children}
    </>
  )
}
