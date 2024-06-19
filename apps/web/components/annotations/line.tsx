import { AnnotationHandler, InnerLine } from "codehike/code"

export const line: AnnotationHandler = {
  name: "line",
  Line: (props) => (
    <div className="px-2">
      <InnerLine merge={props} />
    </div>
  ),
}
