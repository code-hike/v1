import { RawCode, Pre, highlight, AnnotationComponents } from "codehike/code"
import Content from "./content.md"
import { InlineLink } from "./link"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")
  return <Pre code={info} components={[link]} className="m-0 bg-zinc-950" />
}

const link: AnnotationComponents = {
  name: "Link",
  Inline: ({ annotation, children }) => {
    const { query } = annotation
    return <a href={query}>{children}</a>
  },
}
