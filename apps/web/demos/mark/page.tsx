import { RawCode, Pre, highlight, AnnotationHandler } from "codehike/code"
import Content from "./content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

const mark: AnnotationHandler = {
  name: "mark",
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

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      className="m-0 px-0 bg-zinc-950 selection:bg-red-300"
      code={highlighted}
      handlers={[mark]}
    />
  )
}
