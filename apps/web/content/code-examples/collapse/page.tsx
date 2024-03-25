import {
  CodeData,
  CodeRender,
  highlight,
} from "codehike/code"
import Content from "./content.md"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({
  codeblock,
}: {
  codeblock: CodeData
}) {
  const info = await highlight(codeblock, "github-dark")

  info.annotations = info.annotations.flatMap(
    (annotation) => {
      if (annotation.name !== "Collapse") {
        return annotation
      }
      const { fromLineNumber } = annotation as any
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
    <CodeRender
      className="m-0 px-0"
      info={info}
      components={{
        BlockCollapse,
        LineCollapseTrigger,
        BlockCollapseContent: CollapsibleContent,
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
