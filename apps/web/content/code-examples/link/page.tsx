import {
  CodeData,
  CodeRender,
  highlight,
} from "codehike/code"
import Content from "./content.md"
import { InlineLink } from "./link"

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
    <CodeRender info={info} components={{ InlineLink }} />
  )
}
