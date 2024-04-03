import { RawCode, Pre, highlight } from "codehike/code"
import { Block, CodeBlock, parse } from "codehike/schema"
import React from "react"
import { map, z } from "zod"
import { Demo } from "@/components/demo"
import { CodeWithNotes } from "@/components/code-with-notes"

const ContentSchema = Block.extend({
  implementation: Block.extend({}),
})

type Content = z.infer<typeof ContentSchema>

export function PreviewImplementation({ getBlocks }: { getBlocks: any }) {
  const { children, implementation } = parse(
    getBlocks({
      components: {
        Code,
        Demo,
      },
    }),
    ContentSchema,
  )

  return (
    <>
      {children}
      <Implementation {...implementation} />
    </>
  )
}

async function Implementation({ children }: Content["implementation"]) {
  return (
    <>
      <h2>Implementation</h2>
      {children}
      {/* <CodeWithNotes blocks={{ code, notes }} /> */}
    </>
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark", {
    annotationPrefix: "!!",
  })

  return <Pre className="m-0 bg-transparent" code={info} />
}
