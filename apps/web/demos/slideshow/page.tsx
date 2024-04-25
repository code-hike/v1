import { Block, CodeBlock, parseRoot } from "codehike/blocks"
import Content from "./content.md"
import { z } from "zod"
import { Display, Step, Steps } from "codehike/utils"
import { Pre, RawCode, highlight } from "codehike/code"
import { Controls } from "./controls"

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export default function Page() {
  const { steps } = parseRoot(Content, Schema)
  return (
    <Steps>
      <Controls length={steps.length} />
      <Display
        values={steps.map((step) => (
          <Code codeblock={step.code} />
        ))}
      />
      <Controls length={steps.length} />
      <Display values={steps.map((step) => step.children)} />
    </Steps>
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      className="min-h-[40rem] !bg-zinc-900 m-0 rounded-none p-2"
    />
  )
}
