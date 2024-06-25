import {
  AnnotationHandler,
  HighlightedCode,
  InnerLine,
  Pre,
  RawCode,
  highlight,
} from "codehike/code"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { fold } from "./annotations/fold"
import { link } from "./annotations/link"
import theme from "@/theme.mjs"
import { lineNumbers } from "./annotations/line-numbers"
import { CodeIcon } from "./annotations/icons"
import { collapse } from "./annotations/collapse"
import { callout } from "./annotations/callout"
import { mark } from "./annotations/mark"
import { pill } from "./annotations/pill"
import { ruler } from "./annotations/ruler"
import { wordWrap } from "./annotations/word-wrap"
import { line } from "./annotations/line"
import { tokenTransitions } from "./annotations/token-transitions"
import { focus } from "./annotations/focus"

export async function Code({
  codeblock,
  ...rest
}: {
  codeblock: RawCode
  className?: string
  style?: React.CSSProperties
}) {
  const { flags } = extractFlags(codeblock)
  const highlighted = await highlight(codeblock, theme, {
    annotationPrefix: flags.includes("p") ? "!!" : undefined,
  })
  return <HighCode highlighted={highlighted} {...rest} />
}

export function HighCode({
  highlighted,
  className,
  style,
}: {
  highlighted: HighlightedCode
  className?: string
  style?: React.CSSProperties
}) {
  const { title, flags } = extractFlags(highlighted)
  const h = { ...highlighted, meta: title }

  const handlers = [
    pill,
    fold,
    link,
    focus,
    mark,
    ruler,
    flags.includes("a") && tokenTransitions,
    flags.includes("n") && lineNumbers,
    ...collapse,
    line,
    flags.includes("w") && wordWrap,
    callout,
  ].filter(Boolean) as AnnotationHandler[]

  const pre = (
    <Pre
      code={h}
      className="m-0 py-2 px-0 bg-editor-background rounded-none group flex-1 selection:bg-editor-selectionBackground"
      handlers={handlers}
      style={{
        backgroundColor: "var(--bg-color)",
      }}
    />
  )

  if (title) {
    return (
      <div
        className={cn(
          "border border-editorGroup-border rounded overflow-hidden my-2",
          className,
        )}
        style={
          {
            "--border-color": "var(--ch-23)",
            borderColor: "var(--border-color)",
            ...style,
          } as any
        }
      >
        <div
          className="px-3 py-2 border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground text-sm text-tab-activeForeground flex"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="text-tab-activeForeground text-sm flex items-center gap-3">
            <CodeIcon title={title} />
            <span>{title}</span>
          </div>
          {flags.includes("c") && (
            <CopyButton text={h.code} className="ml-auto" />
          )}
        </div>
        {pre}
      </div>
    )
  } else {
    return (
      <div
        className={cn(
          "border border-editorGroup-border rounded overflow-hidden my-2 relative",
          className,
        )}
        style={
          {
            "--border-color": "var(--ch-23)",
            borderColor: "var(--border-color)",
            ...style,
          } as any
        }
      >
        {flags.includes("c") && (
          <CopyButton text={h.code} className="absolute right-4 my-0 top-2" />
        )}
        {pre}
      </div>
    )
  }
}

export function extractFlags(codeblock: RawCode) {
  const flags =
    codeblock.meta.split(" ").filter((flag) => flag.startsWith("-"))[0] ?? ""
  const title =
    codeblock.meta === flags
      ? ""
      : codeblock.meta.replace(" " + flags, "").trim()
  return { title, flags: flags.slice(1).split("") }
}
