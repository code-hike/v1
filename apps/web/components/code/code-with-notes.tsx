import { Pre, highlight } from "codehike/code"
import { Block, CodeBlock, parse } from "codehike/schema"
import { z } from "zod"
import { CopyButton } from "@/components/copy-button"
import { tooltip } from "@/components/annotations/tooltip"
import { collapse } from "../annotations/collapse"
import { callout } from "../annotations/callout"

const ContentSchema = z.object({
  code: CodeBlock,
  notes: z.array(Block).optional(),
})

type RawBlocks = any

export async function CodeWithNotes(props: RawBlocks) {
  const { code, notes = [] } = parse(props, ContentSchema)
  const highlighted = await highlight(code, "github-from-css")

  // find matches between annotations and notes
  // and add the note as data to the annotation
  highlighted.annotations = highlighted.annotations.map((a) => {
    const note = notes.find((n) => a.query && n.title === a.query)
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
    <div className="border border-editorGroup-border rounded overflow-hidden">
      <div className="border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground px-3 py-2 text-tab-activeForeground text-sm flex">
        <span>{highlighted.meta}</span>
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre
        className="m-0 px-0 bg-editor-background rounded-none whitespace-pre-wrap selection:bg-editor-selectionBackground"
        code={highlighted}
        handlers={[callout, tooltip, ...collapse]}
      />
    </div>
  )
}
