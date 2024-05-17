import { Block, parseRoot } from "codehike/blocks"
import Content from "./conf-demo.mdx"
import { z } from "zod"

const Schema = Block.extend({
  blocks: z.array(
    Block.extend({
      note: Block.optional(),
    }),
  ),
})

const { blocks } = parseRoot(Content, Schema)

export const slides = blocks.map(({ children, note }) => {
  return {
    children: <div className="overflow-auto h-full w-full">{children}</div>,
    notes: note?.children,
  }
})
