import {
  Block,
  CodeBlock,
  HighlightedCodeBlock,
  parseRoot,
} from "codehike/blocks"
import Content from "./conf-demo.mdx"
import { z } from "zod"
import { HighlightedCode, Pre } from "codehike/code"
import { wordWrap } from "@/components/annotations/word-wrap"
import { cn } from "@/lib/utils"

const Schema = Block.extend({
  content: HighlightedCodeBlock,
  pages: z.array(HighlightedCodeBlock),
})

const { pages, content } = parseRoot(Content, Schema)

export const slides = []

const old = [
  ...pages.map((page, i) => {
    return {
      children: (
        <div className="overflow-auto h-full w-full bg-blue-950">
          <Code highlighted={content} className="h-full right-[55%]" />
          <Code highlighted={page} className="h-full right-16" />
        </div>
      ),
      notes: undefined,
    }
  }),
  {
    children: (
      <a href="https://codesandbox.io/p/devbox/jsheroes-2024-grn3jr">demo</a>
    ),
  },
]

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
        "bg-white p-2 rounded overflow-auto shadow h-4/5 w-5/12 top-10 transition-all duration-500 whitespace-pre-wrap ",
        className,
        getPosition(highlighted.meta),
      )}
      handlers={[wordWrap]}
      style={{ position: "absolute" }}
    />
  )
}
