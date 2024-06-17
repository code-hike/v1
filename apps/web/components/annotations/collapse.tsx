import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { BlockAnnotation, AnnotationHandler, InnerLine } from "codehike/code"

const collapseRoot: AnnotationHandler = {
  name: "Collapse",
  transform: (annotation: BlockAnnotation) => {
    const { fromLineNumber } = annotation
    return [
      annotation,
      {
        ...annotation,
        fromLineNumber: fromLineNumber,
        toLineNumber: fromLineNumber,
        name: "CollapseTrigger",
      },
      {
        ...annotation,
        fromLineNumber: fromLineNumber + 1,
        name: "CollapseContent",
      },
    ]
  },
  Block: ({ annotation, children }) => {
    return (
      <Collapsible defaultOpen={annotation.query !== "collapsed"}>
        {children}
      </Collapsible>
    )
  },
}

const collapseTrigger: AnnotationHandler = {
  name: "CollapseTrigger",
  AnnotatedLine: ({ annotation, ...props }) => {
    const icon = (
      <ChevronDownIcon
        className="inline-block group-data-[state=closed]:-rotate-90 transition select-none opacity-30 group-data-[state=closed]:opacity-80 group-hover:!opacity-100 mb-0.5"
        size={15}
      />
    )
    return (
      <CollapsibleTrigger className="group contents">
        <InnerLine merge={props} data={{ icon }} />
      </CollapsibleTrigger>
    )
  },
  Line: (props) => {
    const { data, lineNumber, children } = props
    const icon = data?.icon as React.ReactNode
    return (
      <InnerLine merge={props} className="table-row">
        <span className="pr-2 w-[4ch] box-content !opacity-50 text-right select-none table-cell">
          {lineNumber}
        </span>
        <span className="w-6 text-center table-cell">{icon}</span>
        <div className="table-cell break-words">{children}</div>
      </InnerLine>
    )
  },
}

const collapseContent: AnnotationHandler = {
  name: "CollapseContent",
  Block: CollapsibleContent,
}

export const collapse = [collapseRoot, collapseTrigger, collapseContent]
