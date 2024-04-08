import { Pre, highlight } from "codehike/code"
import { Block, CodeBlock, parse } from "codehike/schema"
import { z } from "zod"
import { CopyButton } from "@/components/copy-button"
import { InlineTooltip } from "@/components/annotations/tooltip"
import {
  expandCollapseAnnotations,
  collapseComponents,
} from "../annotations/collapse"

const ContentSchema = z.object({
  code: CodeBlock,
  notes: z.array(Block).optional(),
})

type RawBlocks = any

export async function CodeWithNotes(props: RawBlocks) {
  const { code, notes = [] } = parse(props, ContentSchema)
  const highlighted = await highlight(code, "github-dark")
  highlighted.annotations = expandCollapseAnnotations(highlighted.annotations)

  // find matches between annotations and notes
  // and add the note as data to the annotation
  highlighted.annotations = highlighted.annotations.map((a) => {
    const note = notes.find((n) => a.query && n.title === a.query)
    if (!note) return a
    return {
      ...a,
      data: {
        children: note.children,
      },
    }
  })

  return (
    <div className="border border-zinc-700 rounded overflow-hidden">
      <div className="border-b border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-300 text-sm flex">
        <span>{highlighted.meta}</span>
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre
        className="m-0 px-0 bg-transparent whitespace-pre-wrap"
        code={highlighted}
        components={{ InlineTooltip, ...collapseComponents }}
      />
    </div>
  )
}
