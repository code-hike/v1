import { AnnotationHandler, InnerLine } from "codehike/code"

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => (
    <div
      data-mark={annotation ? "true" : undefined}
      className="border-l-2 border-transparent data-[mark]:border-blue-400 data-[mark]:bg-blue-400/10"
    >
      <InnerLine merge={props} />
    </div>
  ),
}
