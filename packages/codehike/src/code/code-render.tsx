import { AnnotationComponents } from "./render/annotation-components.js"
import {
  Annotation,
  InternalToken,
  LineContent,
  Tokens,
  isBlockAnnotation,
  isInlineAnnotation,
} from "./render/common.js"
import { RenderLineContent, toLineContent } from "./render/tokens.js"

export function CodeRender({
  tokens,
  annotations,
  components,
}: {
  tokens: Tokens
  annotations: Annotation[]
  components: AnnotationComponents
}) {
  const lines = toLines(tokens)

  const blockAnnotations = annotations.filter(isBlockAnnotation)
  const inlineAnnotations = annotations.filter(isInlineAnnotation)

  return (
    <pre>
      {lines.map((line, i) => {
        const lineAnnotations = inlineAnnotations.filter(
          (annotation) => annotation[1] === i + 1,
        )
        const lineContent = toLineContent(line, lineAnnotations)

        return (
          <>
            <RenderLineContent
              key={i}
              lineContent={lineContent}
              components={components}
            />
            {i < lines.length - 1 ? "\n" : undefined}
          </>
        )
      })}
    </pre>
  )
}

function toLines(tokens: Tokens): InternalToken[][] {
  const lines = [[]] as InternalToken[][]
  const tokenStack = tokens.slice()
  let col = 1
  while (tokenStack.length) {
    const token = tokenStack.shift()!
    if (typeof token === "string") {
      const [value, ...tail] = token.split("\n")
      if (value) {
        let start = col
        col += value.length
        lines[lines.length - 1].push({
          value,
          range: [start, col],
        })
      }
      if (tail.length) {
        lines.push([])
        col = 1
        tokenStack.unshift(tail.join("\n"))
      }
    } else {
      const [value, color, rest = {}] = token
      let start = col
      col += value.length
      lines[lines.length - 1].push({
        value,
        style: { color, ...rest },
        range: [start, col],
      })
    }
  }
  return lines
}
