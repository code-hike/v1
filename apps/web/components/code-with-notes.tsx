import { LineComponent, Pre, highlight } from "codehike/code"
import { Block, CodeBlock, parse } from "codehike/schema"
import { z } from "zod"
import { CopyButton } from "@/components/copy-button"
import { InlineTooltip } from "@/components/annotations/tooltip"

const ContentSchema = z.object({
  code: CodeBlock,
  notes: z.array(Block),
})

export async function CodeWithNotes({ blocks }: { blocks: any }) {
  const { code, notes } = parse(blocks, ContentSchema)
  const highlighted = await highlight(code, "github-dark")

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
        components2={{ Line, InlineTooltip }}
      />
    </div>
  )
}

const Line: LineComponent = ({ lineNumber, children, ...rest }) => {
  return (
    <div data-line={lineNumber} className="table-row ">
      <span className="pr-6 w-[4ch] box-content !opacity-50 text-right select-none table-cell">
        {lineNumber}
      </span>
      <div className="table-cell break-words">{children}</div>
    </div>
  )
}
