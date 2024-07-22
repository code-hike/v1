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

    const annotationNames = new Set(annotations.map((a) => a.name))

    handlers
      .filter((c) => c.transform)
      .forEach((c) => {
        annotations = annotations.flatMap((a) =>
          c.name != a.name ? a : c.transform!(a as any) || [],
        )
      })

    const hs = handlers.filter(
      (h) => !h.onlyIfAnnotated || annotationNames.has(h.name),
    )

    const stack = getStack(hs, annotationNames)
    const merge = { _stack: stack, _ref: ref as any }
    return (
      <InnerPre merge={merge} data-theme={themeName} data-lang={lang} {...rest}>
        <PreContent
          tokens={tokens}
          annotationNames={annotationNames}
          handlers={hs}
          annotations={annotations}
        />
      </InnerPre>
    )
  },
)

function PreContent({
  tokens,
  annotationNames,
  handlers,
  annotations,
}: {
  tokens: Tokens
  annotationNames: Set<string>
  handlers: AnnotationHandler[]
  annotations: CodeAnnotation[]
}) {
  const lines = toLines(tokens)
  const indentations = lines.map(
    (line) => line.tokens[0]?.value.match(/^\s*/)?.[0].length || 0,
  )
  const blockAnnotations = annotations.filter(isBlockAnnotation)
  const inlineAnnotations = annotations.filter(isInlineAnnotation)
  const groups = toLineGroups(lines, blockAnnotations)
  return renderLines({
    linesOrGroups: groups,
    annotationNames,
    handlers,
    inlineAnnotations,
    indentations,
    totalLines: lines.length,
  })
}

function getStack(handlers: AnnotationHandler[], annotationNames: Set<string>) {
  const noRefStack = handlers
    .filter(
      ({ Pre, name, onlyIfAnnotated }) =>
        Pre && (!onlyIfAnnotated || annotationNames.has(name)),
    )
    .map(({ Pre }) => Pre!)
  const refStack = handlers
    .filter(
      ({ PreWithRef, name, onlyIfAnnotated }) =>
        PreWithRef && (!onlyIfAnnotated || annotationNames.has(name)),
    )
    .map(({ PreWithRef }) => PreWithRef!)

  if (refStack.length > 0) {
    refStack.unshift(AddRefIfNedded as any)
  }
  const stack = [...noRefStack, ...refStack]
  return stack
}
