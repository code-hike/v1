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
  AnnotationComponents,
} from "codehike/code"
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
      components={[collapse, collapseTrigger, collapseContent]}
    />
  )
}

const collapse: AnnotationComponents = {
  name: "Collapse",
  transform: (annotation) => {
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
  },
  Block: ({ annotation, children }) => {
    return (
      <Collapsible defaultOpen={annotation.query !== "collapsed"}>
        {children}
      </Collapsible>
    )
  },
}

const collapseTrigger: AnnotationComponents = {
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

const collapseContent: AnnotationComponents = {
  name: "CollapseContent",
  Block: CollapsibleContent,
}
