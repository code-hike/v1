import { forwardRef } from "react"
import { toLineContent } from "./tokens.js"
import {
  AnnotationHandler,
  BlockAnnotation,
  CodeAnnotation,
  CustomLineProps,
  InlineAnnotation,
  InternalToken,
  PreComponent,
  Tokens,
  isBlockAnnotation,
  isInlineAnnotation,
} from "./types.js"
import { AddRefIfNedded } from "./pre-ref.js"
import { InnerLine, InnerPre } from "./inner.js"
import { RenderLineContent } from "./inline.js"

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
  return (
    <RenderLines
      linesOrGroups={groups}
      annotationNames={annotationNames}
      handlers={handlers}
      inlineAnnotations={inlineAnnotations}
      indentations={indentations}
      totalLines={lines.length}
    />
  )
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

function RenderLines({
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

    let children: React.ReactNode = (
      <RenderLineContent lineContent={lineContent} handlers={handlers} />
    )

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
  if (!Component) {
    return (
      <RenderLines
        linesOrGroups={lines}
        handlers={handlers}
        inlineAnnotations={inlineAnnotations}
        annotationStack={[annotation, ...annotationStack]}
        indentations={indentations}
        annotationNames={annotationNames}
        totalLines={totalLines}
      />
    )
  }
  return (
    <Component annotation={annotation}>
      <RenderLines
        linesOrGroups={lines}
        handlers={handlers}
        inlineAnnotations={inlineAnnotations}
        annotationStack={[annotation, ...annotationStack]}
        indentations={indentations}
        annotationNames={annotationNames}
        totalLines={totalLines}
      />
    </Component>
  )
}

function toLines(tokens: Tokens): LineTokens[] {
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
        lines[lines.length - 1].push({
          value: "\n",
          range: [col, col + 1],
        })
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
  return lines.map((tokens, i) => ({ tokens, range: [i + 1, i + 1] }))
}

function toLineGroups(
  lines: LineTokens[],
  annotations: BlockAnnotation[],
): LinesOrGroups {
  let groups = lines as LinesOrGroups
  for (let i = annotations.length - 1; i >= 0; i--) {
    const annotation = annotations[i]
    groups = applyBlockAnnotation(groups, annotation)
  }
  return groups
}

function applyBlockAnnotation(
  lines: LinesOrGroups,
  annotation: BlockAnnotation,
): LinesOrGroups {
  const { fromLineNumber, toLineNumber } = annotation
  const range = [fromLineNumber, toLineNumber]
  let groups = splitGroups(lines, range[0])
  groups = splitGroups(groups, range[1] + 1)
  let before = [] as LinesOrGroups
  let inside = [] as LinesOrGroups
  let after = [] as LinesOrGroups
  groups.forEach((group) => {
    if (group.range[1] < range[0]) {
      before.push(group)
    } else if (group.range[0] > range[1]) {
      after.push(group)
    } else {
      inside.push(group)
    }
  })

  return [
    ...before,
    {
      annotation,
      lines: inside,
      range: [inside[0].range[0], inside[inside.length - 1].range[1]],
    },
    ...after,
  ]
}

function splitGroups(groups: LinesOrGroups, lineNumber: number): LinesOrGroups {
  const index = groups.findIndex((group) => {
    return (
      isGroup(group) &&
      group.range[0] < lineNumber &&
      lineNumber <= group.range[1]
    )
  })

  if (index === -1) {
    return groups
  }

  const group = groups[index] as LineGroup
  const lines = splitGroups(group.lines, lineNumber)
  let before = [] as LinesOrGroups
  let after = [] as LinesOrGroups
  lines.forEach((lineOrGroup) => {
    if (lineOrGroup.range[1] < lineNumber) {
      before.push(lineOrGroup)
    } else {
      after.push(lineOrGroup)
    }
  })

  return [
    ...groups.slice(0, index),
    { ...group, lines: before, range: [group.range[0], lineNumber - 1] },
    { ...group, lines: after, range: [lineNumber, group.range[1]] },
    ...groups.slice(index + 1),
  ]
}

function isGroup(item: LinesOrGroups[0]): item is LineGroup {
  return (item as LineGroup).annotation !== undefined
}
