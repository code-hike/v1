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
import { wordWrap } from "@/components/annotations/word-wrap"

const Schema = Block.extend({
  blocks: z.array(
    Block.extend({
      left: HighlightedCodeBlock.optional(),
      right: HighlightedCodeBlock.optional(),
      video: ImageBlock.optional(),
      note: Block.optional(),
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)
console.log(blocks)

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

const positions = {
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  "hidden-l": "bottom-0 -left-20 transform -translate-x-full",
  "hidden-br": "bottom-0 right-0 transform translate-x-full translate-y-full",
  "hidden-r": "bottom-0 -right-20 transform translate-x-full",
  "code-r": "bottom-0 right-0 ",
  "code-l": "bottom-0 left-0 ",
  "video-r": "top-0 left-[40%]",
  "video-l": "top-0 left-0",
  "video-b": "opacity-0 left-1/4 -top-20 scale-[0.85]",
  "code-cl": "-bottom-10 left-5 h-[114%] scale-[0.85]",
  "code-cr": "-bottom-10 right-5 h-[114%] scale-[0.85]",
}

function getPosition(title?: string) {
  return title ? positions[title as keyof typeof positions] : ""
}

export const slides = blocks.map(({ left, right, video, note }) => {
  return {
    children: (
      <div className="absolute inset-4 ">
        <video
          src={video!.url}
          className={cn(
            "rounded absolute w-5/6 transition-all duration-500 shadow",
            getPosition(video?.alt),
          )}
        />
        <Code
          highlighted={left!}
          className={cn(
            "absolute w-1/2 h-4/5 transition-all duration-500",
            getPosition(left?.meta),
          )}
          title="content.mdx"
        />
        <Code
          highlighted={right!}
          className={cn(
            "absolute w-1/2 h-4/5 transition-all duration-500 ",
            getPosition(right?.meta),
          )}
          title="page.jsx"
        />
      </div>
    ),
    notes: note?.children,
  }
})

function Code({
  highlighted,
  className,
  title,
}: {
  highlighted: HighlightedCode
  title?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "border border-editorGroup-border rounded overflow-hidden my-2 absolute",
        className,
      )}
    >
      <div className="border-b border-zinc-200 bg-zinc-300 px-3 py-2 text-sm text-tab-activeForeground flex">
        <span>{title}</span>
      </div>
      <Pre
        code={highlighted}
        className={cn(
          "bg-white p-2 rounded-none overflow-hidden whitespace-pre-wrap shadow",
        )}
        handlers={[tokenTransitions, wordWrap]}
      />
    </div>
  )
}
