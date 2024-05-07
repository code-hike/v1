import { AnnotationHandler } from "codehike/code"

export const wordWrap: AnnotationHandler = {
  Line: ({ InnerLine, ...props }) => {
    return (
      <div className="table-row">
        <InnerLine
          merge={props}
          // style={{
          //   textIndent: `${-props.indentation}ch`,
          //   marginLeft: `${props.indentation}ch`,
          // }}
        />
      </div>
    )
  },
}
