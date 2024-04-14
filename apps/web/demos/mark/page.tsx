import { RawCode, Pre, highlight, AnnotationComponents } from "codehike/code"
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
      components={[mark]}
    />
  )
}

const mark: AnnotationComponents = {
  name: "Mark",
  AnnotatedLine: ({ annotation, InnerLine, ...props }) => (
    <InnerLine merge={props} data-mark={true} />
  ),
  Line: ({ InnerLine, ...props }) => (
    <InnerLine
      merge={props}
      className="px-2 border-l-2 border-transparent data-[mark]:border-blue-400 data-[mark]:bg-blue-400/10"
    />
  ),
}
