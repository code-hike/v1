import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import {
  RawCode,
  Pre,
  highlight,
  BlockAnnotation,
  InlineAnnotation,
  CodeAnnotation,
  LineComponent,
} from "codehike/code"

export function expandCollapseAnnotations(
  annotations: CodeAnnotation[],
): CodeAnnotation[] {
  return annotations.flatMap((annotation) => {
    if (annotation.name !== "Collapse") {
      return annotation
    }
    const { fromLineNumber } = annotation as BlockAnnotation
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
  })
}

export const collapseComponents = {
  BlockCollapse,
  BlockCollapseContent: CollapsibleContent,
  LineCollapseTrigger,
  Line,
}

function BlockCollapse({
  annotation,
  children,
}: {
  annotation: any
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen={annotation.query !== "collapsed"}>
      {children}
    </Collapsible>
  )
}

function LineCollapseTrigger({ annotation, ...props }: any) {
  const icon = (
    <ChevronDownIcon
      className="inline-block group-data-[state=closed]:-rotate-90 transition select-none opacity-30 group-data-[state=closed]:opacity-80 group-hover:!opacity-100 mb-0.5"
      size={15}
    />
  )
  return (
    <CollapsibleTrigger className="group contents">
      <Line {...props} icon={icon} />
    </CollapsibleTrigger>
  )
}

function Line({
  lineNumber,
  children,
  icon,
  ...rest
}: {
  children: React.ReactNode
  lineNumber: number
  icon?: React.ReactNode
}) {
  return (
    <div data-line={lineNumber} className="table-row">
      <span className="pr-2 w-[4ch] box-content !opacity-50 text-right select-none table-cell">
        {lineNumber}
      </span>
      <span className="w-6 text-center table-cell">{icon}</span>
      <div className="table-cell break-words">{children}</div>
    </div>
  )
}
