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
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)
console.log(blocks)

export const slides = blocks.map(({ children, note }) => {
  return {
    children: children,
    notes: note?.children,
  }
})
