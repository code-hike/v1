import { parseProps, Block, CodeBlock } from "codehike/blocks"

import {
  AnnotationHandler,
  InlineAnnotation,
  Pre,
  RawCode,
  highlight,
} from "codehike/code"
import theme from "@/theme.mjs"
import { CodeIcon } from "../annotations/icons"

export async function BlocksDemo(props: unknown) {
  const { content, component, result } = parseProps(
    props,
    Block.extend({
      content: CodeBlock,
      component: CodeBlock,
      result: CodeBlock,
    }),
  )

  const resultChildren = <CalloutCode code={result} />
  return (
    <div className="flex gap-2 items-stretch">
      <div className="min-w-0 flex-1 ">
        <CodeWithNotes code={content} />
      </div>
      <div className="min-w-0 flex-1 min-h-full">
        <CodeWithNotes
          code={component}
          notes={{
            result: { children: resultChildren },
          }}
        />
      </div>
    </div>
  )
}

async function CalloutCode({ code }: { code: RawCode }) {
  const highlighted = await highlight(code, theme)
  return <Pre code={highlighted} className="m-0 p-1 bg-transparent" />
}

export async function CodeWithNotes({
  code,
  notes = {},
}: {
  code: RawCode
  notes?: Record<string, { children: React.ReactNode }>
}) {
  const highlighted = await highlight(code, theme)
  const icon = <CodeIcon codeblock={code} />

  highlighted.annotations = highlighted.annotations.map((a) => {
    const note = notes[a.query]
    if (!note) return a
    return {
      ...a,
      data: {
        ...a.data,
        children: note.children,
      },
    }
  })

  return (
    <div className="min-h-full border border-editorGroup-border rounded overflow-hidden">
      <div className="border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground px-3 py-2 text-tab-activeForeground text-sm flex items-center gap-3">
        {icon}
        <span>{highlighted.meta}</span>
      </div>
      <Pre
        className="m-0 px-0 bg-editor-background rounded-none whitespace-pre-wrap selection:bg-editor-selectionBackground"
        code={highlighted}
        handlers={[callout]}
      />
    </div>
  )
}

const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: {
        ...annotation.data,
        column: (fromColumn + toColumn) / 2,
      },
    }
  },
  Line: ({ InnerLine, ...props }) => {
    return <InnerLine merge={props} className="px-3" />
  },
  AnnotatedLine: ({ InnerLine, annotation, indentation, ...props }) => {
    const { column } = annotation.data
    return (
      <>
        <InnerLine {...props} />
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="w-fit border bg-editorGroupHeader-tabsBackground border-editorGroup-border rounded px-2 relative my-1 ml-[3ch] whitespace-break-spaces prose-p:my-0"
        >
          <div
            style={{ left: `${column - 3}ch` }}
            className="absolute border-l border-t border-editorGroup-border w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-editorGroupHeader-tabsBackground"
          />
          {annotation.data.children || annotation.query}
        </div>
      </>
    )
  },
}
