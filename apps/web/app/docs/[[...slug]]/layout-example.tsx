import { Block, Code as CodeSchema, parse } from "codehike/schema"
import { Tab, Tabs } from "next-docs-ui/components/tabs"
import { CopyButton } from "@/ui/copy-button"
import { z } from "zod"
import { DependencyTerminal } from "@/ui/dependency-terminal"
import { CodeData, highlight, Pre } from "codehike/code"

const Content = Block.extend({
  intro: Block,
  mdx: CodeSchema,
  preview: Block,
  code: z.array(CodeSchema),
})
type LayoutContent = z.infer<typeof Content>

export function LayoutExample({ getBlocks }: { getBlocks: any }) {
  const content = parse(
    getBlocks({
      Code: () => <div>Doo</div>,
    }),
    Content,
  )
  const { intro, mdx, preview, code } = content

  return (
    <>
      {intro.children}
      <Tabs items={["Preview", "MDX", "Code"]}>
        <Tab
          value="Preview"
          className="bg-blue-500/30 mt-0 p-6 bg-[url(/dark-grid.svg)]"
        >
          <div
            className={`border border-primary/50 bg-zinc-950 rounded ${preview.title}`}
          >
            {preview.children}
          </div>
        </Tab>
        <Tab value="MDX">
          <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
            <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
              <span>content.mdx</span>
              <CopyButton className="ml-auto" text={mdx.value} />
            </div>
            <MDXCode data={mdx} />
          </div>
        </Tab>
        <Tab value="Code">
          {code.map((codeblock, i) => (
            <Code key={i} codeblock={codeblock} />
          ))}
        </Tab>
      </Tabs>
    </>
  )
}

async function MDXCode({ data }: { data: CodeData }) {
  const info = await highlight(data, "github-dark")
  return <Pre info={info} className="m-0 whitespace-pre-wrap" />
}

async function Code({ codeblock }: { codeblock: CodeData }) {
  const c = codeblock
  const info = await highlight(codeblock, "github-dark")
  if (c.meta === "dependencies") {
    return <DependencyTerminal codeblock={c} />
  }
  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
      <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
        <span>{c.meta}</span>
        <CopyButton className="ml-auto" text={c.value} />
      </div>
      <Pre info={info} className="max-h-96 m-0" />
    </div>
  )
}
