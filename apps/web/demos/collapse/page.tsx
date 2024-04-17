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
  AnnotationHandler,
} from "codehike/code"
import Content from "./content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")

  return (
    <Pre
      className="m-0 px-0 bg-zinc-950"
      code={highlighted}
      handlers={[collapse, collapseTrigger, collapseContent]}
    />
  )
}

const collapse: AnnotationHandler = {
  name: "collapse",
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
  AnnotatedLine: ({ annotation, InnerLine, ...props }) => {
    const icon = (
      <ChevronDownIcon
        className="inline-block group-data-[state=closed]:-rotate-90 transition select-none opacity-30 group-data-[state=closed]:opacity-80 group-hover:!opacity-100 mb-0.5"
        size={15}
      />
    )
    return (
      <CollapsibleTrigger className="group">
        <InnerLine merge={props} icon={icon} />
      </CollapsibleTrigger>
    )
  },
  Line: ({ annotation, icon, InnerLine, children, ...props }) => {
    return (
      <InnerLine merge={props}>
        <span className="w-6 text-center inline-block">{icon}</span>
        {children}
      </InnerLine>
    )
  },
}

const collapseContent: AnnotationHandler = {
  name: "CollapseContent",
  Block: CollapsibleContent,
}
