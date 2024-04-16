import { parseContent } from "codehike"
import { RawCode, Pre, highlight } from "codehike/code"
import { Block, parse } from "codehike/schema"
import { Callout } from "next-docs-ui/components/callout"
import React from "react"

const ContentSchema = Block.extend({})

export function CodeExample({ MDX }: { MDX: any }) {
  const { children } = parseContent(ContentSchema, MDX, {
    components: { PreviewContainer },
  })

  return children
}

function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded flex-1 bg-blue-400/50 bg-[url(/dark-grid.svg)] p-3">
      {children}
    </div>
  )
}
