import { CodeBlock, CodeContent, tokenize } from "codehike"
import { cn } from "../../../lib/utils"

export function HikeGuide({ hike }: any) {
  const { steps } = hike
  const first = steps[0]
  return (
    <div className="flex gap-2">
      <Code codeblock={first.code[0]} note={first.note.children} />
      <Code codeblock={first.code[1]} note={first.note.children} />
      <div className="flex flex-col w-32">
        {steps.map((step: any, i: number) => {
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
              {step.query}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function Code({
  codeblock,
  note,
}: {
  codeblock: CodeBlock
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

  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900 flex-1 min-w-0">
      <div className="items-center bg-zinc-800 p-2 pl-2 text-xs flex text-zinc-100">
        <span>{codeblock.meta}</span>
      </div>
      <CodeContent
        codeblock={codeblock}
        className="p-2 overflow-auto m-0"
        config={{ theme: "github-dark", annotationPrefix: "!" }}
        components={{ ...annotations, Note }}
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
