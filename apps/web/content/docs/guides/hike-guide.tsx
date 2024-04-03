import { cn } from "@/lib/utils"
import { z } from "zod"

import { Block, CodeBlock, parse } from "codehike/schema"
import { Pre, RawCode, highlight } from "codehike/code"

const Content = Block.extend({
  blocks: z
    .tuple([
      Block.extend({
        code: z.array(CodeBlock),
        note: Block.optional(),
      }),
    ])
    .rest(
      Block.extend({
        code: z.array(CodeBlock).optional(),
        note: Block.optional(),
      }),
    ),
})

export function HikeGuide({ hike }: any) {
  return <div>TO DO</div>
  const content = parse(hike, Content)
  const { blocks } = content
  const first = blocks[0]
  return (
    <div className="flex gap-2">
      <Code codeblock={first.code[0]} note={first.note?.children} />
      <Code codeblock={first.code[1]} note={first.note?.children} />
      <div className="flex flex-col w-32">
        {blocks.map((step: any, i: number) => {
          const inactive =
            "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground/80"
          const active = "bg-primary/10 font-medium text-primary"
          return (
            <span
              key={i}
              className={cn(
                "flex flex-row items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer",
                i === 0 ? active : inactive,
              )}
            >
              {step.title}
            </span>
          )
        })}
      </div>
    </div>
  )
}

async function Code({
  codeblock,
  note,
}: {
  codeblock: RawCode
  note?: React.ReactNode
}) {
  const Note = ({ children, query }: any) => {
    return (
      <>
        <div style={{ background: "black", color: "white" }}>{note}</div>
        <br />
        {children}
      </>
    )
  }

  const info = await highlight(codeblock, "github-dark")

  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900 flex-1 min-w-0">
      <div className="items-center bg-zinc-800 p-2 pl-2 text-xs flex text-zinc-100">
        <span>{codeblock.meta}</span>
      </div>
      <Pre
        code={info}
        className="p-2 overflow-auto m-0"
        components={{ ...annotations }}
      />
    </div>
  )
}

const annotations = {
  Color: ({ children, query }: any) => {
    return (
      <span
        style={{ border: "1px solid", borderColor: query, borderRadius: 3 }}
      >
        {children}
      </span>
    )
  },
}
