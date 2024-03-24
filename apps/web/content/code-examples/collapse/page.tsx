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
        BlockCollapse: Collapsible,
        BlockCollapseTrigger: CollapsibleTrigger,
        BlockCollapseContent: CollapsibleContent,
        Line,
      }}
    />
  )
}

// function LineCollapseTrigger({
//   Line,
//   annotation,
//   lineNumber,
// }) {
//   return (
//     <Line icon={<ChevronDownIcon className="rotate" />} />
//   )
// }

function Line({
  children,
  icon,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="px-3">
      {icon}
      {children}
    </div>
  )
}
