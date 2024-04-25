import Content from "./content.md"
import {
  Block,
  CodeBlock,
  parseRoot,
} from "codehike/blocks"
import { z } from "zod"
import { Pre, RawCode, highlight } from "codehike/code"
import { Display, Step, Steps } from "codehike/utils"

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export default function Page() {
  const { steps } = parseRoot(Content, Schema)
  return (
    <Steps className="flex gap-4">
      <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert">
        {steps.map((step, i) => (
          <Step
            key={i}
            index={i}
            className="border-l-4 border-zinc-700 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded bg-zinc-900"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Step>
        ))}
      </div>
      <div className="w-[40vw] max-w-xl bg-zinc-900">
        <div className="top-16 sticky">
          <Display
            values={steps.map((step) => (
              <Code codeblock={step.code} />
            ))}
          />
        </div>
      </div>
    </Steps>
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(
    codeblock,
    "github-dark",
  )
  return (
    <Pre code={highlighted} className="min-h-[40rem]" />
  )
}
