import { CodeData, CodeRender, highlight } from "codehike/code"
import { Block, Code as CodeSchema, parse } from "codehike/schema"
import { Callout } from "next-docs-ui/components/callout"
import React from "react"

const Content = Block.extend({})

export function CodeExample({ getBlocks }: { getBlocks: any }) {
  const { children } = parse(
    getBlocks({ components: { UsageAndPreview, Code: UsageCode } }),
    Content,
  )

  return (
    <>
      <Callout title="Code Examples" type="info">
        Use this examples as a reference. Use them as inspiration to create your
        own components. Copy, paste, customize.
      </Callout>
      {children}
    </>
  )
}

function UsageAndPreview({ children }: { children: React.ReactNode }) {
  const [usage, preview] = React.Children.toArray(children)
  return (
    <div className="flex gap-2">
      <div className="min-w-0 flex-1">{usage}</div>
      <div className="min-w-0 rounded flex-1 bg-blue-400/50 bg-[url(/dark-grid.svg)] p-3">
        <div className="overflow-hidden">{preview}</div>
      </div>
    </div>
  )
}

async function UsageCode({ codeblock }: { codeblock: CodeData }) {
  const info = await highlight(codeblock, "github-dark", {
    annotationPrefix: "!!",
  })

  return <CodeRender className="m-0" info={info} />
}
