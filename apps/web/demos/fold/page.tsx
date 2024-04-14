import { RawCode, Pre, highlight, AnnotationComponents } from "codehike/code"
import Content from "./content.md"
import { Inline } from "./annotations"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")

  return <Pre className="m-0 bg-zinc-950" code={info} components={[fold]} />
}

export const fold: AnnotationComponents = {
  name: "Fold",
  Inline,
}
