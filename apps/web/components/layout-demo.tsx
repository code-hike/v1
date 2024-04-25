import fs from "fs"
import path from "path"
import { Pre, RawCode, highlight } from "codehike/code"
import { CopyButton } from "./copy-button"
import { BasicCode } from "./code/basic-code"
import { Tab, Tabs } from "next-docs-ui/components/tabs"

export async function LayoutDemo({
  name,
  children,
  content = "content.md",
}: {
  name: string
  content?: string
  children: React.ReactNode
}) {
  const value = await fs.promises.readFile(
    path.join(process.cwd(), "demos", name, content),
    "utf-8",
  )

  const { default: Page } = await import(`@/demos/${name}/page`)

  return (
    <Tabs items={["Preview", "MDX", "Implementation"]}>
      <Tab
        value="Preview"
        className=" mt-0 p-6 bg-blue-900/80 bg-[url(/dark-grid.svg)] prose-invert"
      >
        <div className={`border border-primary/50 bg-zinc-950 rounded`}>
          <Page />
        </div>
      </Tab>
      <Tab value="MDX">
        <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
          <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
            <span>content.mdx</span>
            <CopyButton className="ml-auto" text={value} />
          </div>
          <MDXCode
            data={{
              value,
              lang: "mdx",
              meta: "content.md prefix",
            }}
          />
        </div>
      </Tab>
      <Tab value="Implementation">{children}</Tab>
    </Tabs>
  )
}
async function MDXCode({ data }: { data: RawCode }) {
  const info = await highlight(data, "github-dark")
  return <Pre code={info} className="m-0 whitespace-pre-wrap" />
}
