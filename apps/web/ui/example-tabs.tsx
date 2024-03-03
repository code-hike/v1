import { Tab, Tabs } from "next-docs-ui/components/tabs"
import { CodeContent } from "codehike"
import { CopyButton } from "./copy-button"
import { DependencyTerminal } from "./dependency-terminal"
import { Block, Code as CodeBlock, parse } from "codehike/schema"
import { z } from "zod"

const TabsSchema = Block.extend({
  code: z.array(CodeBlock),
  preview: Block,
})

type TabsContent = z.infer<typeof TabsSchema>

export function ExampleTabs({ hike }: any) {
  const content = parse(hike, TabsSchema)
  const mdx = content.code.filter((code: any) => code.lang === "mdx")[0]
  const code = content.code.filter((code: any) => code.lang !== "mdx")
  const preview = content.preview

  return (
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
        <MDX codeblock={mdx} />
      </Tab>
      <Tab value="Code">
        {code.map((codeblock: any, i: number) => (
          <Code key={i} codeblocks={[codeblock]} />
        ))}
      </Tab>
    </Tabs>
  )
}

function MDX({ codeblock }: { codeblock: TabsContent["code"][0] }) {
  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
      <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
        <span>content.mdx</span>
        <CopyButton className="ml-auto" text={codeblock.value} />
      </div>
      <CodeContent
        codeblock={codeblock}
        config={{ theme: "github-dark", annotationPrefix: "!" }}
        className="m-0 whitespace-pre-wrap"
      />
    </div>
  )
}

function Code({ codeblocks }: { codeblocks: TabsContent["code"] }) {
  const c = codeblocks[0]
  if (c.meta === "dependencies") {
    return <DependencyTerminal codeblock={c} />
  }
  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
      <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
        <span>{c.meta}</span>
        <CopyButton className="ml-auto" text={c.value} />
      </div>
      <CodeContent
        codeblock={c}
        config={{ theme: "github-dark", annotationPrefix: "!" }}
        className="max-h-96 m-0"
      />
    </div>
  )
}
