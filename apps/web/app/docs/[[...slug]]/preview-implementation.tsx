import { RawCode, Pre, highlight } from "codehike/code"
import { Block } from "codehike/schema"
import React from "react"
import { z } from "zod"
import { Demo } from "@/components/demo"
import { CodeWithNotes } from "@/components/code-with-notes"
import { parseContent } from "codehike"

const ContentSchema = Block.extend({
  implementation: Block.extend({}),
})

type Content = z.infer<typeof ContentSchema>

export function PreviewImplementation({ MDX }: { MDX: any }) {
  const { children, implementation } = parseContent(ContentSchema, MDX, {
    components: {
      Code,
      Demo,
    },
  })

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
