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
        <BasicCode
          codeblock={{
            value,
            lang: "mdx",
            meta: "content.md prefix",
          }}
        />
      </Tab>
      <Tab value="Implementation">{children}</Tab>
    </Tabs>
  )
}
