import { AnnotationComponents, InlineAnnotation } from "codehike/code"

export const callout: AnnotationComponents = {
  name: "Callout",
  transform: (annotation) => {
    const { name, query, lineNumber, fromColumn, toColumn } =
      annotation as InlineAnnotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: {
        ...annotation.data,
        column: (fromColumn + toColumn) / 2,
      },
    }
  },
  AnnotatedLine: ({ InnerLine, annotation, indentation, ...props }) => {
    const { column } = annotation.data
    return (
      <>
        <div
          style={{
            minWidth: `${column + 4}ch`,
            marginLeft: `${7 + indentation}ch`,
          }}
          className="w-fit border bg-zinc-900 border-zinc-200/50 rounded px-2 relative my-1 whitespace-break-spaces prose-p:my-1 text-center"
        >
          <div
            style={{ left: `${column - indentation}ch` }}
            className="absolute border-r border-b  border-zinc-200/50 w-2 h-2 rotate-45 translate-y-1/2 -bottom-[1px] bg-zinc-900"
          />
          {annotation.data.children || annotation.query}
        </div>
        <InnerLine {...props} />
      </>
    )
  },
}
