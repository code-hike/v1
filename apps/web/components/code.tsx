import {
  AnnotationHandler,
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

export async function Code({
  codeblock,
  className,
}: {
  codeblock: RawCode
  className?: string
}) {
  const highlighted = await highlight(codeblock, theme)
  const { title, flags } = extractFlags(codeblock)
  highlighted.meta = title

  const handlers = [
    fold,
    link,
    focus,
    mark,
    flags.includes("n") && lineNumbers,
    callout,
    ...collapse,
  ].filter(Boolean) as AnnotationHandler[]

  const pre = (
    <Pre
      code={highlighted}
      className="m-0 py-2 px-0 bg-editor-background rounded-none group flex-1 selection:bg-editor-selectionBackground"
      handlers={handlers}
    />
  )

  if (title) {
    return (
      <div
        className={cn(
          "border border-editorGroup-border rounded overflow-hidden my-2",
          className,
        )}
      >
        <div className="px-3 py-2 border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground text-sm text-tab-activeForeground flex">
          <div className="text-tab-activeForeground text-sm flex items-center gap-3">
            <CodeIcon title={title} />
            <span>{highlighted.meta}</span>
          </div>
          {flags.includes("c") && (
            <CopyButton text={highlighted.code} className="ml-auto" />
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
      >
        {flags.includes("c") && (
          <CopyButton
            text={highlighted.code}
            className="absolute right-4 my-0 top-2"
          />
        )}
        {pre}
      </div>
    )
  }
}

function extractFlags(codeblock: RawCode) {
  const flags =
    codeblock.meta.split(" ").filter((flag) => flag.startsWith("-"))[0] ?? ""
  const title = codeblock.meta.replace(flags, "").trim()
  return { title, flags: flags.slice(1).split("") }
}

const focus: AnnotationHandler = {
  name: "Focus",
  AnnotatedLine: ({ annotation, ...props }) => (
    <InnerLine merge={props} data-focus={true} />
  ),
  Line: (props) => (
    <InnerLine
      merge={props}
      className="group-has-[[data-focus]]:opacity-60 data-[focus]:!opacity-100 transition-opacity px-3 data-[focus]:bg-editor-rangeHighlightBackground"
    />
  ),
}
