import Content from "./ch-intro.mdx"
import { HighlightedCode, Pre } from "codehike/code"
import { tokenTransitions } from "@/components/annotations/token-transitions"
import {
  parseProps,
  Block,
  HighlightedCodeBlock,
  ImageBlock,
  parseRoot,
} from "codehike/blocks"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { wordWrap } from "@/components/annotations/word-wrap"

const Schema = Block.extend({
  blocks: z.array(Block),
})

const { blocks } = parseRoot(Content, Schema)

export const slides = blocks.map(({ children }) => {
  return {
    children: <div className="">{children}</div>,
    notes: "notes",
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
        "bg-white p-2 rounded overflow-hidden whitespace-pre-wrap shadow",
        className,
      )}
      handlers={[tokenTransitions, wordWrap]}
      style={{ position: "absolute" }}
    />
  )
}
