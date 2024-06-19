import {
  CodeAnnotation,
  RawCode,
  Pre,
  InlineAnnotation,
  highlight,
} from "codehike/code"
import Content from "./auto-content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")
  const annotations = getLinkAnnotations(info.code)
  info.annotations.push(...annotations)
  return (
    <Pre
      code={info}
      // components2={{ InlineLink }}
    />
  )
}

const urlRegex = /https?:\/\/[\w\-_.~:/?#[\]@!$&*+,;=%]+/g
function getLinkAnnotations(code: string): InlineAnnotation[] {
  const lines = code.split("\n")
  const annotations: InlineAnnotation[] = []

  lines.forEach((line, i) => {
    let match: RegExpExecArray | null
    while ((match = urlRegex.exec(line)) !== null) {
      const url = match[0]
      const start = match.index
      const end = start + url.length

      annotations.push({
        name: "link",
        query: url,
        lineNumber: i + 1,
        fromColumn: start + 1,
        toColumn: end + 1,
      })
    }
  })
  return annotations
}
