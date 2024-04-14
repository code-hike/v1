import { forwardRef } from "react"
import { AnnotationHandler } from "./types.js"

export const DefaultPre: BasePre = forwardRef((props, ref) => {
  return <pre {...props} ref={ref} />
})

export function getPreComponent(components: AnnotationHandler[]) {
  const OuterPre = components.find((c) => c.Pre)?.Pre as CustomPre

  if (!OuterPre) {
    return DefaultPre
  }

  const NewPre: InnerPre = forwardRef((props, ref) => {
    return <OuterPre ref={ref} InnerPre={DefaultPre} {...props} />
  })

  return NewPre
}

type ForwardRefPre<Props> = React.ForwardRefExoticComponent<
  React.ComponentProps<"pre"> & Props & React.RefAttributes<HTMLPreElement>
>

// the output of getPreComponent
type FinalPre = ForwardRefPre<{}>
// the user provided components
type CustomPre = ForwardRefPre<{ InnerPre: InnerPre }>
type InnerPre = ForwardRefPre<{}>
type BasePre = ForwardRefPre<{}>
