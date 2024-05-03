import { AnnotationHandler, Pre, RawCode, highlight } from "codehike/code"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import { fold } from "../annotations/fold"
import theme from "@/theme.mjs"
import { link } from "../annotations/link"

export async function BasicCode({
  codeblock,
  className,
}: {
  codeblock: RawCode
  className?: string
}) {
  const { meta, ...flags } = extractFlags(codeblock)

  if (flags.command) {
    return <CommandCode codeblock={codeblock} />
  }

  const highlighted = await highlight(
    codeblock,
    theme,
    flags.prefix ? { annotationPrefix: "!!" } : {},
  )
  return (
    <div
      className={cn(
        "border border-editorGroup-border rounded overflow-hidden my-2",
        className,
      )}
    >
      <div className="border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground px-3 py-2 text-sm text-tab-activeForeground flex">
        <span>{meta}</span>
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre
        code={highlighted}
        className="m-0 px-0 bg-editor-background rounded-none whitespace-pre-wrap group flex-1 selection:bg-editor-selectionBackground"
        handlers={[focus, fold, link]}
      />
    </div>
  )
}

async function CommandCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, theme)
  return (
    <div className="border border-editorGroup-border rounded overflow-hidden my-2 relative">
      <CopyButton
        text={highlighted.code}
        className="absolute right-4 h-full my-0"
      />
      <Pre
        code={highlighted}
        className="m-0 px-0 bg-editor-background rounded-none whitespace-pre-wrap group flex-1 selection:bg-editor-selectionBackground"
        handlers={[focus, fold]}
      />
    </div>
  )
}

const validFlags = ["prefix", "ln", "ww", "command"]

function extractFlags(codeblock: RawCode) {
  const parts = codeblock.meta?.split(" ") ?? []

  const meta = parts.filter((flag) => !validFlags.includes(flag)).join(" ")
  const flags: any = {
    meta,
  }
  parts.forEach((flag) => {
    if (validFlags.includes(flag)) {
      flags[flag] = true
    }
  })
  return flags
}

const focus: AnnotationHandler = {
  name: "Focus",
  AnnotatedLine: ({ InnerLine, ...props }) => (
    <InnerLine merge={props} data-focus={true} />
  ),
  Line: ({ InnerLine, ...props }) => (
    <InnerLine
      merge={props}
      className="group-has-[[data-focus]]:opacity-60 data-[focus]:!opacity-100 transition-opacity px-3 data-[focus]:bg-editor-rangeHighlightBackground"
    />
  ),
}
