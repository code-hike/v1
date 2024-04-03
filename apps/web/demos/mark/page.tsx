import { RawCode, Pre, highlight } from "codehike/code"
import Content from "./content.md"
import { LineMark, Line } from "./mark"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")
  return (
    <Pre
      className="m-0 px-0"
      code={info}
      components={{ LineMark, Line }}
    />
  )
}
