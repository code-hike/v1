import Content from "./demo.mdx"
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
import { Conf } from "./conf"

const Schema = Block.extend({
  blocks: z.array(
    Block.extend({
      content: HighlightedCodeBlock.optional(),
      page: HighlightedCodeBlock.optional(),
      demo: z.string().optional(),
      note: Block.optional(),
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)

let prevBlock = null
for (let block of blocks) {
  if (!block.content) {
    block.content = prevBlock?.content as HighlightedCode
  }
  if (!block.page) {
    block.page = prevBlock?.page as HighlightedCode
  }
  if (!block.demo) {
    block.demo = prevBlock?.demo
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

export const slides = blocks.map(({ content, page, demo, note }) => {
  return {
    children: (
      <div className="gap-2">
        <Code highlighted={page!} />
        <Code highlighted={content!} />
        <Demo title={demo} />
      </div>
    ),
    notes: note?.children,
  }
})

function Demo({ title }: { title?: string }) {
  return (
    <div
      className={cn(
        "bg-blue-950 rounded overflow-auto overflow-x-hidden shadow h-4/5 w-2/5 top-10 transition-all duration-500 absolute pl-3",
        getPosition(title),
      )}
    >
      <div className="scale-75 origin-top-left w-[28rem]">
        <Conf />
      </div>
    </div>
  )
}

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
