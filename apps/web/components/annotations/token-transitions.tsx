import { AnnotationHandler } from "codehike/code"
import { forwardRef } from "react"
import { CodeTransitions } from "./token-transitions.client"

export const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  Pre: forwardRef<HTMLPreElement, any>((props, ref) => (
    <CodeTransitions {...props} ref={ref} />
  )),
  Token: ({ InnerToken, ...props }) => (
    <InnerToken merge={props} className="inline-block" />
  ),
}
