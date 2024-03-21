import {
  CodeData,
  CodeRender,
  highlight,
} from "codehike/code"
import Content from "./content.md"
import { LineMark, Line } from "./twoslash"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({
  codeblock,
}: {
  codeblock: CodeData
}) {
  const info = await highlight(codeblock, "github-dark")
  return (
    <CodeRender
      className="m-0 px-0"
      info={info}
      components={{ LineMark, Line }}
    />
  )
}
