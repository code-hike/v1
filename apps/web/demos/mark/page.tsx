import { RawCode, Pre, highlight } from "codehike/code"
import Content from "./content.md"
import { LineAnnotationComponent, LineComponent } from "codehike/code"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      className="m-0 px-0 bg-zinc-950"
      code={highlighted}
      components={{ LineMark, Line }}
    />
  )
}

export const LineMark: LineAnnotationComponent = ({ children }) => {
  return (
    <div className="px-2 border-l-2 border-blue-400 bg-blue-400/10">
      {children}
    </div>
  )
}

export const Line: LineComponent = ({ children }) => {
  return <div className="px-2 border-l-2 border-transparent">{children}</div>
}
