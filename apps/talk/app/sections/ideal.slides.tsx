import Content from "./ideal.mdx"
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

const Schema = Block.extend({
  blocks: z.array(
    Block.extend({
      left: HighlightedCodeBlock.optional(),
      right: HighlightedCodeBlock.optional(),
      video: ImageBlock.optional(),
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)

// fill missing blocks
let prevBlock = null
for (let block of blocks) {
  if (!block.left) {
    block.left = prevBlock?.left
  }
  if (!block.right) {
    block.right = prevBlock?.right
  }
  prevBlock = block
}

export const slides = blocks.map(({ left, right, video }) => {
  return (
    <div className="absolute inset-4">
      {video && (
        <video
          src={video.url}
          className="rounded absolute top-0 left-0 w-2/3"
        />
      )}
      <Code
        highlighted={right!}
        className="absolute bottom-0 right-0 w-1/2 h-4/5"
      />
    </div>
  )
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
      className={cn("bg-zinc-900 p-2 rounded", className)}
      handlers={[tokenTransitions]}
      style={{ position: "absolute" }}
    />
  )
}
