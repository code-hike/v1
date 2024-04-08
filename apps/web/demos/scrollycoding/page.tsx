import { parseContent } from "codehike"
import Content from "./content.md"
import { Block, CodeBlock } from "codehike/schema"
import { z } from "zod"
import { Tabs, Tab, TabPanel } from "./sticker"
import { Pre, RawCode, highlight } from "codehike/code"

const ContentSchema = Block.extend({
  steps: z.array(
    Block.extend({
      code: CodeBlock,
    }),
  ),
})

export default function Page() {
  const { steps } = parseContent(ContentSchema, Content)
  return (
    <Tabs className="flex gap-4">
      <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert">
        {steps.map((step, i) => (
          <Tab key={i} className="mb-24">
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Tab>
        ))}
      </div>
      <div className="w-[40vw] max-w-xl bg-zinc-900">
        <TabPanel className="top-16 sticky">
          <Content />
        </TabPanel>
      </div>
    </Tabs>
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return <Pre code={highlighted} className="min-h-[40rem]" />
}
