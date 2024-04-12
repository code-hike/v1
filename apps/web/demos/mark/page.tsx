import {
  RawCode,
  Pre,
  highlight,
  LineAnnotationComponent,
  LineComponent,
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
      components2={{ LineMark, Line }}
    />
  )
}

const LineMark: LineAnnotationComponent = ({ children }) => {
  return (
    <div className="px-2 border-l-2 border-blue-400 bg-blue-400/10">
      {children}
    </div>
  )
}

const Line: LineComponent = ({ children }) => {
  return <div className="px-2 border-l-2 border-transparent">{children}</div>
}
