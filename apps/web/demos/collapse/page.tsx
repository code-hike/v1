import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { RawCode, Pre, highlight, BlockAnnotation } from "codehike/code"
import Content from "./content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

type CodeComponent = (props: { codeblock: RawCode }) => Promise<JSX.Element>

const Code: CodeComponent = async ({ codeblock }) => {
  const highlighted = await highlight(codeblock, "github-dark")

  highlighted.annotations = highlighted.annotations.flatMap((annotation) => {
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

  return (
    <Pre
      className="m-0 px-0 bg-zinc-950"
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
      <span className="w-6 text-center inline-block">{icon}</span>
      {children}
    </div>
  )
}
