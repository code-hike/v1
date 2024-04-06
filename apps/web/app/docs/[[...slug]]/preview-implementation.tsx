import { Block } from "codehike/schema"
import React from "react"
import { z } from "zod"
import { Demo } from "@/components/demo"
import { CodeWithNotes } from "@/components/code/code-with-notes"
import { parseContent } from "codehike"

const ContentSchema = Block.extend({
  demo: Block,
  implementation: Block,
})

export function PreviewImplementation({ MDX }: { MDX: any }) {
  const { demo, implementation } = parseContent(ContentSchema, MDX, {
    components: { Demo, CodeWithNotes },
  })

  return (
    <>
      {demo.children}
      <h2>Implementation</h2>
      {implementation.children}
    </>
  )
}
