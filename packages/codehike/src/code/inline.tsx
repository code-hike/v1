import { InnerToken } from "./inner.js"
import { isGroup, LineContent, TokenGroup } from "./tokens.js"
import {
  AnnotationHandler,
  CodeAnnotation,
  CustomTokenProps,
  InlineAnnotation,
  InternalToken,
} from "./types.js"

export function RenderLineContent({
  lineContent,
  handlers,
  lineNumber,
}: {
  lineContent: LineContent
  handlers: AnnotationHandler[]
  lineNumber: number
}) {
  // TODO get Token from annotationStack
  const annotationStack: CodeAnnotation[] = []
  const stack = handlers.flatMap(({ name, Token, AnnotatedToken }) => {
    const s = [] as CustomTokenProps["_stack"]
    const annotation = annotationStack.find((a) => a.name === name)
    if (annotation && AnnotatedToken) {
      s.push({ Component: AnnotatedToken, annotation })
    }
    if (Token) {
      s.push({ Component: Token })
    }
    return s
  })

  return lineContent.map((item, i) => {
    if (isGroup(item)) {
      return (
        <AnnotatedTokens
          group={item}
          handlers={handlers}
          key={i}
          lineNumber={lineNumber}
        />
      )
    } else {
      return item.style ? (
        <InnerToken
          merge={{
            _stack: stack,
            style: item.style,
            value: item.value,
            lineNumber,
          }}
          key={i}
        />
      ) : (
        // whitespace
        item.value
      )
    }
  })
}

function AnnotatedTokens({
  lineNumber,
  group,
  handlers,
}: {
  lineNumber: number
  group: TokenGroup
  handlers: AnnotationHandler[]
}) {
  const { annotation, content } = group
  const { name } = annotation
  const Component = handlers.find((c) => c.name === name)?.Inline
  if (!Component) {
    return (
      <RenderLineContent
        lineContent={content}
        handlers={handlers}
        lineNumber={lineNumber}
      />
    )
  }
  return (
    <Component annotation={annotation} lineNumber={lineNumber}>
      <RenderLineContent
        lineContent={content}
        handlers={handlers}
        lineNumber={lineNumber}
      />
    </Component>
  )
}
