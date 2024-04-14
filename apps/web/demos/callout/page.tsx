import Content from "./content.md"
import { callout } from "./code"
import {
  RawCode,
  Pre,
  highlight,
  InlineAnnotation,
  AnnotationComponents,
} from "codehike/code"

export default function Page() {
  return <Content components={{ Code }} />
}

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")

  return (
    <Pre
      className="m-0 bg-zinc-950"
      code={highlighted}
      components={[callout]}
    />
  )
}
