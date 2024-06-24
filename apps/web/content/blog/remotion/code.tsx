import { RawCode } from "codehike/code"
import { Code as TheCode, extractFlags } from "@/components/code"
import { Block, parseProps } from "codehike/blocks"

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const { flags } = extractFlags(codeblock)

  const style = {} as any
  if (flags.includes("1")) {
    style["--border-color"] = "rgb(96 165 250 / 0.75)"
    style["--bg-color"] = "rgb(96 165 250 / 0.10)"
  } else if (flags.includes("2")) {
    style["--border-color"] = "transparent"
  }

  const className = flags.includes("f") ? "h-full my-0" : "my-0"

  return <TheCode codeblock={codeblock} style={style} className={className} />
}

export function Columns(props: unknown) {
  const { left, right } = parseProps(
    props,
    Block.extend({ left: Block, right: Block }),
  )
  return (
    <div className="flex gap-2  -mx-8">
      <div className="flex-1 min-w-0">{left.children}</div>
      <div className="flex-1 min-w-0">{right.children}</div>
    </div>
  )
}
