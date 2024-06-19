import { AnnotationHandler, InlineAnnotation, InnerLine } from "codehike/code"

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    // transform inline annotation to block annotation
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
    const { indentation, children } = props
    return (
      <>
        <InnerLine merge={props}>{children}</InnerLine>
        <div
          style={{
            minWidth: `${column + 4}ch`,
            marginLeft: `${indentation - 1}ch`,
          }}
          className="w-fit border bg-editorGroupHeader-tabsBackground border-editorGroup-border rounded px-0 relative my-1 whitespace-break-spaces prose-p:my-1 prose-p:mx-2 select-none"
        >
          <div
            style={{ left: `${column - indentation}ch` }}
            className="absolute border-l border-t  border-editorGroup-border w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px]  bg-editorGroupHeader-tabsBackground"
          />
          {annotation.data.children || annotation.query}
        </div>
      </>
    )
  },
}
