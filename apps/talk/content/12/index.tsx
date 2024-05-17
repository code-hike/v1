import Content from "./ch-intro.mdx"
import { HighlightedCode, Pre } from "codehike/code"
import { tokenTransitions } from "@/components/annotations/token-transitions"
import {
  parseProps,
  Block,
  HighlightedCodeBlock,
  ImageBlock,
  parseRoot,
  CodeBlock,
} from "codehike/blocks"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { wordWrap } from "@/components/annotations/word-wrap"

const Schema = Block.extend({
  blocks: z.array(
    Block.extend({
      input: HighlightedCodeBlock.optional(),
      output: HighlightedCodeBlock.optional(),
      page: HighlightedCodeBlock.optional(),
      note: Block.optional(),
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)

let prevBlock = null
for (let block of blocks) {
  if (!block.input) {
    block.input = prevBlock?.input as HighlightedCode
  }
  if (!block.output) {
    block.output = prevBlock?.output as HighlightedCode
  }
  if (!block.page) {
    block.page = prevBlock?.page as HighlightedCode
  }
  prevBlock = block
}

const positions = {
  ll: "right-[100%]",
  r: "right-16",
  l: "right-[55%]",
  mh: "opacity-0 right-[20%] scale-[0.85]",
  rr: "opacity-0 -right-96",
  c: "right-[30%]",
}

function getPosition(title?: string) {
  return title ? positions[title as keyof typeof positions] : ""
}

export const slides = blocks.map(({ input, output, page, note }) => {
  return {
    children: (
      <div className="gap-2">
        <Code highlighted={output!} />
        <Code highlighted={input!} />
        <Code highlighted={page!} />
      </div>
    ),
    notes: note?.children,
  }
})

function Code({
  highlighted,
  className,
}: {
  highlighted: HighlightedCode
  className?: string
}) {
  return (
    <Pre
      code={highlighted}
      className={cn(
        "bg-white p-2 rounded overflow-hidden shadow h-4/5 w-2/5 top-10 transition-all duration-500",
        className,
        getPosition(highlighted.meta),
      )}
      handlers={[tokenTransitions]}
      style={{ position: "absolute" }}
    />
  )
}
