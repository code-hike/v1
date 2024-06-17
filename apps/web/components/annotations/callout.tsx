import { AnnotationHandler, InlineAnnotation, InnerLine } from "codehike/code"

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn } = annotation
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
  AnnotatedLine: ({ annotation, ...props }) => {
    const { column } = annotation.data
    const { indentation } = props
    return (
      <>
        <div
          style={{
            minWidth: `${column + 4}ch`,
            marginLeft: `${7 + indentation}ch`,
          }}
          className="w-fit border bg-editorGroupHeader-tabsBackground border-editorGroup-border rounded px-2 relative my-1 whitespace-break-spaces prose-p:my-1 text-center select-none"
        >
          <div
            style={{ left: `${column - indentation}ch` }}
            className="absolute border-r border-b  border-editorGroup-border w-2 h-2 rotate-45 translate-y-1/2 -bottom-[1px] bg-editorGroupHeader-tabsBackground"
          />
          {annotation.data.children || annotation.query}
        </div>
        <InnerLine merge={props} />
      </>
    )
  },
}
