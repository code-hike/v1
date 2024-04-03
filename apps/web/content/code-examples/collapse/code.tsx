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
} from "codehike/code"

type CodeComponent = (props: {
  codeblock: RawCode
}) => Promise<JSX.Element>

export const CollapseCode: CodeComponent = async ({
  codeblock,
}) => {
  const highlighted = await highlight(
    codeblock,
    "github-dark",
  )

  console.log(JSON.stringify(codeblock, null, 2))
  console.log(
    JSON.stringify(highlighted.annotations, null, 2),
  )

  highlighted.annotations = highlighted.annotations.flatMap(
    (annotation) => {
      if (annotation.name !== "Collapse") {
        return annotation
      }
      const { fromLineNumber } =
        annotation as BlockAnnotation
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
  )

  return (
    <Pre
      className="m-0 px-0"
      code={highlighted}
      components={{
        BlockCollapse,
        BlockCollapseContent: CollapsibleContent,
        LineCollapseTrigger,
        Line,
      }}
    />
  )
}

function BlockCollapse({
  annotation,
  children,
}: {
  annotation: any
  children: React.ReactNode
}) {
  return (
    <Collapsible
      defaultOpen={annotation.query !== "collapsed"}
    >
      {children}
    </Collapsible>
  )
}

function LineCollapseTrigger({
  annotation,
  ...props
}: any) {
  const icon = (
    <ChevronDownIcon
      className="inline-block group-data-[state=closed]:-rotate-90 transition select-none opacity-30 group-data-[state=closed]:opacity-80 group-hover:!opacity-100 mb-0.5"
      size={15}
    />
  )
  return (
    <CollapsibleTrigger className="group">
      <Line {...props} icon={icon} />
    </CollapsibleTrigger>
  )
}

function Line({
  children,
  lineNumber,
  icon,
}: {
  children: React.ReactNode
  lineNumber: number
  icon?: React.ReactNode
}) {
  return (
    <div data-line={lineNumber}>
      <span className="w-6 text-center inline-block">
        {icon}
      </span>
      {children}
    </div>
  )
}
