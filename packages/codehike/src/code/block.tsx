import { renderLineContent } from "./inline.js"
import { InnerLine } from "./inner.js"
import { toLineContent } from "./tokens.js"
import {
  AnnotationHandler,
  BlockAnnotation,
  CustomLineProps,
  InlineAnnotation,
  InternalToken,
} from "./types.js"

type LineGroup = {
  annotation: BlockAnnotation
  lines: LinesOrGroups
  range: [number, number]
}

type LineTokens = {
  tokens: InternalToken[]
  range: [number, number]
}

type LinesOrGroups = (LineTokens | LineGroup)[]

export function renderLines({
  linesOrGroups,
  handlers,
  inlineAnnotations,
  indentations,
  annotationStack = [],
  annotationNames,
  totalLines,
}: {
  linesOrGroups: LinesOrGroups
  handlers: AnnotationHandler[]
  inlineAnnotations: InlineAnnotation[]
  annotationStack?: BlockAnnotation[]
  indentations: number[]
  annotationNames: Set<string>
  totalLines: number
}) {
  return linesOrGroups.map((group) => {
    if (isGroup(group)) {
      return (
        <AnnotatedLines
          key={group.range[0]}
          group={group}
          handlers={handlers}
          inlineAnnotations={inlineAnnotations}
          annotationStack={annotationStack}
          indentations={indentations}
          annotationNames={annotationNames}
          totalLines={totalLines}
        />
      )
    }

    const lineNumber = group.range[0]
    const indentation = indentations[lineNumber - 1]

    const lineAnnotations = inlineAnnotations.filter(
      (annotation) => annotation.lineNumber === lineNumber,
    )
    const lineContent = toLineContent(group.tokens, lineAnnotations)

    const stack = handlers.flatMap(({ name, Line, AnnotatedLine }) => {
      const s = [] as CustomLineProps["_stack"]
      const annotation = annotationStack.find((a) => a.name === name)
      if (annotation && AnnotatedLine) {
        s.push({ Component: AnnotatedLine, annotation })
      }
      if (Line) {
        s.push({ Component: Line, annotation })
      }
      return s
    })

    let children: React.ReactNode = renderLineContent({
      content: lineContent,
      handlers,
      annotationStack,
    })

    const merge = { lineNumber, indentation, totalLines, _stack: stack }

    return (
      <InnerLine merge={merge} key={lineNumber}>
        {children}
      </InnerLine>
    )
  })
}

function AnnotatedLines({
  group,
  handlers,
  inlineAnnotations,
  annotationStack,
  indentations,
  annotationNames,
  totalLines,
}: {
  group: LineGroup
  handlers: AnnotationHandler[]
  inlineAnnotations: InlineAnnotation[]
  annotationStack: BlockAnnotation[]
  indentations: number[]
  annotationNames: Set<string>
  totalLines: number
}) {
  const { annotation, lines } = group
  const { name } = annotation
  const Component = handlers.find((c) => c.name === name)?.Block
  const children = renderLines({
    linesOrGroups: lines,
    handlers,
    inlineAnnotations,
    annotationStack: [...annotationStack, annotation],
    indentations,
    annotationNames,
    totalLines,
  })
  return Component ? (
    <Component annotation={annotation}>{children}</Component>
  ) : (
    children
  )
}

function isGroup(item: LinesOrGroups[0]): item is LineGroup {
  return (item as LineGroup).annotation !== undefined
}
