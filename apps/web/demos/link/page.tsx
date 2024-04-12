import { RawCode, Pre, highlight } from "codehike/code"
import Content from "./content.md"
import { InlineLink } from "./link"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")
  return (
    <Pre code={info} components2={{ InlineLink }} className="m-0 bg-zinc-950" />
  )
}
