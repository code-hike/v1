import { CodeData, Pre, highlight } from "codehike/code"
import Content from "./content.md"
import { InlineFold } from "./annotations"

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
    <Pre
      className="m-0"
      info={info}
      components={{ InlineFold }}
    />
  )
}
