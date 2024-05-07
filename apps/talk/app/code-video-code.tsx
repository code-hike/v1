import {
  parseProps,
  Block,
  HighlightedCodeBlock,
  ImageBlock,
} from "codehike/blocks"
import { z } from "zod"
import { HighlightedCode, Pre } from "codehike/code"
import { tokenTransitions } from "../components/annotations/token-transitions"
import { cn } from "../lib/utils"

const Schema = Block.extend({
  left: HighlightedCodeBlock.optional(),
  right: HighlightedCodeBlock.optional(),
  video: ImageBlock.optional(),
})

export function CodeVideoCode(props: unknown) {
  const { left, right, video } = parseProps(props, Schema)
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
      className={cn("bg-zinc-900 p-2 rounded", className)}
      handlers={[tokenTransitions]}
      style={{ position: "absolute" }}
    />
  )
}
