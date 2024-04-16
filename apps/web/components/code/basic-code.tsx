import { AnnotationHandler, Pre, RawCode, highlight } from "codehike/code"
import { CopyButton } from "@/components/copy-button"

export async function BasicCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css")
  return (
    <div className="border border-editorGroup-border rounded overflow-hidden my-2">
      <div className="border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground px-3 py-2 text-sm text-tab-activeForeground flex">
        <span>{highlighted.meta}</span>
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre
        code={highlighted}
        className="m-0 px-0 bg-transparent whitespace-pre-wrap group"
        handlers={[focus]}
      />
    </div>
  )
}

const focus: AnnotationHandler = {
  name: "Focus",
  AnnotatedLine: ({ InnerLine, ...props }) => (
    <InnerLine merge={props} data-focus={true} />
  ),
  Line: ({ InnerLine, ...props }) => (
    <InnerLine
      merge={props}
      className="group-has-[[data-focus]]:opacity-60 data-[focus]:!opacity-100 transition-opacity px-2 data-[focus]:bg-editor-rangeHighlightBackground"
    />
  ),
}
