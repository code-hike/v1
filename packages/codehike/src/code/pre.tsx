import { forwardRef } from "react"
import {
  AnnotationHandler,
  CodeAnnotation,
  PreComponent,
  Tokens,
  isBlockAnnotation,
  isInlineAnnotation,
} from "./types.js"
import { AddRefIfNedded } from "./pre-ref.js"
import { InnerPre } from "./inner.js"
import { renderLines } from "./block.js"
import { toLineGroups, toLines } from "./lines.js"

export const Pre: PreComponent = forwardRef(
  ({ code, handlers = [], ...rest }, ref) => {
    let { tokens, themeName, lang, annotations } = code

    if (!tokens) {
      throw new Error(
        "Missing tokens in code block. Use the `highlight` function to generate the tokens.",
      )
    }

    handlers
      .filter((c) => c.transform)
      .forEach((c) => {
        annotations = annotations.flatMap((a) =>
          c.name != a.name ? a : c.transform!(a as any) || [],
        )
      })

    const annotationNames = new Set(annotations.map((a) => a.name))
    const hs = handlers.filter(
      (h) => !h.onlyIfAnnotated || annotationNames.has(h.name),
    )

    const stack = getStack(hs)
    const merge = { _stack: stack, _ref: ref as any }
    return (
      <InnerPre merge={merge} data-theme={themeName} data-lang={lang} {...rest}>
        <PreContent tokens={tokens} handlers={hs} annotations={annotations} />
      </InnerPre>
    )
  },
)

function PreContent({
  tokens,
  handlers,
  annotations,
}: {
  tokens: Tokens
  handlers: AnnotationHandler[]
  annotations: CodeAnnotation[]
}) {
  const lines = toLines(tokens)
  const blockAnnotations = annotations.filter(isBlockAnnotation)
  const inlineAnnotations = annotations.filter(isInlineAnnotation)
  const groups = toLineGroups(lines, blockAnnotations)
  return renderLines({
    linesOrGroups: groups,
    handlers,
    inlineAnnotations,
  })
}

function getStack(handlers: AnnotationHandler[]) {
  const noRefStack = handlers.map(({ Pre }) => Pre!).filter(Boolean)
  const refStack = handlers.map(({ PreWithRef }) => PreWithRef!).filter(Boolean)
  if (refStack.length > 0) {
    refStack.unshift(AddRefIfNedded as any)
  }
  return [...noRefStack, ...refStack]
}
