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
    components: { Demo },
  })

  return (
    <>
      {demo.children}
      <h2>Implementation</h2>
      {implementation.children}
    </>
  )
}
