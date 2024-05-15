import Content from "./form.mdx"
import {
  parseProps,
  Block,
  HighlightedCodeBlock,
  ImageBlock,
  parseRoot,
} from "codehike/blocks"
import { z } from "zod"

const Schema = Block.extend({
  blocks: z.array(
    Block.extend({
      note: Block.optional(),
      video: ImageBlock,
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)

export const slides = blocks.map(({ note, video }) => {
  return {
    children: (
      <div className="relative h-full flex items-center">
        <video
          src={video.url}
          autoPlay
          className="rounded w-5/6 mx-auto"
          key={video.url}
        />
        <span className="absolute w-full text-center bottom-3 text-white/80">
          {video.alt}
        </span>
      </div>
    ),
    notes: note?.children,
  }
})
