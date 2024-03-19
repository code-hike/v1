import { RenderLineContent, toLineContent } from "./tokens.js"
import {
  AnnotationComponents,
  BlockAnnotation,
  BlockAnnotationComponent,
  BlockAnnotationComponents,
  CodeInfo,
  InlineAnnotation,
  InternalToken,
  LineAnnotationComponent,
  LineAnnotationComponents,
  Tokens,
  isBlockAnnotation,
  isInlineAnnotation,
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

export function CodeRender({
  info,
  components = {},
  className,
}: {
  info: CodeInfo
  components: AnnotationComponents
  className?: string
}) {
  const { tokens, themeName, lang, annotations } = info
  const lines = toLines(tokens)

  const blockAnnotations = annotations.filter(isBlockAnnotation)
  const inlineAnnotations = annotations.filter(isInlineAnnotation)

  const groups = toLineGroups(lines, blockAnnotations)

  return (
    <pre data-theme={themeName} data-lang={lang} className={className}>
      <RenderLines
        linesOrGroups={groups}
        components={components}
        inlineAnnotations={inlineAnnotations}
      />
    </pre>
  )
}

function RenderLines({
  linesOrGroups,
  components,
  inlineAnnotations,
  annotationStack = [],
}: {
  linesOrGroups: LinesOrGroups
  components: AnnotationComponents
  inlineAnnotations: InlineAnnotation[]
  annotationStack?: BlockAnnotation[]
}) {
  return linesOrGroups.map((group) => {
    if (isGroup(group)) {
      return (
        <AnnotatedLines
          key={group.range[0]}
          group={group}
          components={components}
          inlineAnnotations={inlineAnnotations}
          annotationStack={annotationStack}
        />
      )
    }

    const lineNumber = group.range[0]
    const lineAnnotations = inlineAnnotations.filter(
      (annotation) => annotation.lineNumber === lineNumber,
    )
    const lineContent = toLineContent(group.tokens, lineAnnotations)

    // find the first annotation that has a Line component or "Line"
    const annotation = annotationStack.find(
      ({ name }) =>
        components[("Line" + name) as keyof LineAnnotationComponents],
    )

    let Line = components.Line

    let children: React.ReactNode = (
      <RenderLineContent
        lineContent={lineContent}
        components={components}
        lineNumber={lineNumber}
      />
    )

    if (annotation) {
      let { name } = annotation
      const LineComponent =
        components[("Line" + name) as keyof LineAnnotationComponents]
      return (
        <LineComponent lineNumber={lineNumber} annotation={annotation}>
          {children}
        </LineComponent>
      )
    } else if (Line) {
      return (
        <Line lineNumber={lineNumber} key={lineNumber}>
          {children}
        </Line>
      )
    } else {
      return children
    }
  })
}

function AnnotatedLines({
  group,
  components,
  inlineAnnotations,
  annotationStack,
}: {
  group: LineGroup
  components: AnnotationComponents
  inlineAnnotations: InlineAnnotation[]
  annotationStack: BlockAnnotation[]
}) {
  const { annotation, lines } = group
  const { name } = annotation
  const Component =
    components[("Block" + name) as keyof BlockAnnotationComponents]
  if (!Component) {
    return (
      <RenderLines
        linesOrGroups={lines}
        components={components}
        inlineAnnotations={inlineAnnotations}
        annotationStack={[annotation, ...annotationStack]}
      />
    )
  }
  return (
    <Component annotation={annotation}>
      <RenderLines
        linesOrGroups={lines}
        components={components}
        inlineAnnotations={inlineAnnotations}
        annotationStack={[annotation, ...annotationStack]}
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
