import { AnnotationHandler, InnerLine } from "codehike/code"

export const line: AnnotationHandler = {
  name: "line",
  Line: (props) => <InnerLine merge={props} className="px-2" />,
}
