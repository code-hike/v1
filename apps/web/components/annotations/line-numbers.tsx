import { AnnotationHandler, InnerLine } from "codehike/code"

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    return (
      <div className="table-row">
        <div className="min-w-[3ch] box-content !opacity-50 text-right select-none table-cell">
          {props.lineNumber}
        </div>
        <div className="table-cell">
          <InnerLine merge={props} />
        </div>
      </div>
    )
  },
}
