import {
  RawCode,
  Pre,
  highlight,
  LineComponent,
  HighlightedCode,
} from "codehike/code"
import { Block, CodeBlock, parse } from "codehike/schema"
import React from "react"
import { z } from "zod"
import { InlineTooltip } from "@/components/annotations/tooltip"
import { CopyButton } from "@/components/copy-button"
import { Demo } from "@/components/demo"

const ContentSchema = Block.extend({
  implementation: Block.extend({
    explainer: Block.extend({
      code: CodeBlock,
      notes: z.array(Block),
    }),
  }),
})

type Content = z.infer<typeof ContentSchema>

export function PreviewImplementation({ getBlocks }: { getBlocks: any }) {
  const { children, implementation } = parse(
    getBlocks({
      components: {
        UsageAndPreview,
        Code: UsageCode,
        PreviewContainer,
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

async function Implementation({
  children,
  explainer,
}: Content["implementation"]) {
  const { code, notes } = explainer
  const highlighted = await highlight(code, "github-dark")
  highlighted.annotations = highlighted.annotations.map((a) => {
    const note = notes.find((n) => a.query && n.title === a.query)
    if (!note) return a
    return {
      ...a,
      data: {
        children: note.children,
      },
    }
  })

  return (
    <>
      <h2>Implementation</h2>
      {children}
      <p>Something</p>
      <ExplainerCode codeblock={highlighted} />
    </>
  )
}

function UsageAndPreview({ children }: { children: React.ReactNode }) {
  const [usage, preview] = React.Children.toArray(children)
  return (
    <div className="flex gap-2">
      <div className="min-w-0 flex-1">{usage}</div>
      <PreviewContainer>
        <div className="overflow-hidden">{preview}</div>
      </PreviewContainer>
    </div>
  )
}

function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded flex-1 bg-blue-500/40 bg-[url(/dark-grid.svg)] p-3 flex flex-col ">
      {children}
      <div className="mt-auto text-center text-white">Foo bar</div>
    </div>
  )
}

function ExplainerCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <div className="border border-zinc-700 rounded overflow-hidden">
      <div className="border-b border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-300 text-sm flex">
        <span>page.tsx</span>
        <CopyButton text={codeblock.code} className="ml-auto" />
      </div>
      <Pre
        className="m-0 px-0 bg-transparent whitespace-pre-wrap"
        code={codeblock}
        components={{ Line, InlineTooltip }}
      />
    </div>
  )
}

const Line: LineComponent = ({ lineNumber, children, ...rest }) => {
  return (
    <div data-line={lineNumber} className="table-row ">
      <span className="pr-6 w-[4ch] box-content !opacity-50 text-right select-none table-cell">
        {lineNumber}
      </span>
      <div className="table-cell break-words">{children}</div>
    </div>
  )
}

async function UsageCode({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark", {
    annotationPrefix: "!!",
  })

  return <Pre className="m-0 bg-transparent" code={info} />
}
