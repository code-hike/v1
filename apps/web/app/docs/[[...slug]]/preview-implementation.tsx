import { Block } from "codehike/schema"
import React from "react"
import { z } from "zod"
import { Demo } from "@/components/demo"
import { parseContent } from "codehike"
import { Pre, RawCode, highlight } from "codehike/code"
import { CopyButton } from "@/components/copy-button"

const ContentSchema = Block.extend({
  demo: Block,
  implementation: Block,
})

export function PreviewImplementation({ MDX }: { MDX: any }) {
  const { demo, implementation } = parseContent(ContentSchema, MDX, {
    components: { Demo, Code: DemoCode },
  })

  return (
    <>
      {demo.children}
      <h2>Implementation</h2>
      {implementation.children}
    </>
  )
}

async function DemoCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark", {
    annotationPrefix: "!!",
  })
  return (
    <div className="border border-zinc-700 rounded overflow-hidden">
      <div className="border-b border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-300 text-sm flex">
        {codeblock.meta}
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre className="m-0 bg-zinc-950 rounded-none" code={highlighted} />
    </div>
  )
}
