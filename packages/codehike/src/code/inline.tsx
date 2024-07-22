import { InnerToken } from "./inner.js"
import { isGroup, LineContent, TokenGroup } from "./tokens.js"
import {
  AnnotationHandler,
  CodeAnnotation,
  CustomTokenProps,
  InternalToken,
} from "./types.js"

export function RenderLineContent({
  lineContent,
  handlers,
}: {
  lineContent: LineContent
  handlers: AnnotationHandler[]
}) {
  return lineContent.map((item, i) =>
    isGroup(item) ? (
      <InlinedTokens group={item} handlers={handlers} key={i} />
    ) : item.style ? (
      <FinalToken handlers={handlers} token={item} key={i} />
    ) : (
      item.value
    ),
  )
}

function FinalToken({
  handlers,
  token,
}: {
  handlers: AnnotationHandler[]
  token: InternalToken
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
  return (
    <InnerToken
      merge={{
        _stack: stack,
        style: token.style,
        value: token.value,
      }}
    />
  )
}

function InlinedTokens({
  group,
  handlers,
}: {
  group: TokenGroup
  handlers: AnnotationHandler[]
}) {
  const { annotation, content } = group
  const { name } = annotation
  const Component = handlers.find((c) => c.name === name)?.Inline
  if (!Component) {
    return <RenderLineContent lineContent={content} handlers={handlers} />
  }
  return (
    <Component annotation={annotation}>
      <RenderLineContent lineContent={content} handlers={handlers} />
    </Component>
  )
}
