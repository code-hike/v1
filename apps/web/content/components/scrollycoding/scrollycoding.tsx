import { Steps, ScrollyStep, Step } from "codehike/scrolly"
import { CodeBlock } from "codehike"
import { CodeRender, highlight } from "codehike/code"

export function Scrollycoding({ hike }: { hike: any }) {
  const steps = hike.steps.map((step: any) => ({
    sticker: <Code codeblock={step.code} />,
  }))

  return (
    <Steps className="flex gap-4" steps={steps}>
      <ScrollableContent steps={hike.steps} />
      <div className="w-[40vw] max-w-xl bg-zinc-900">
        <div className="top-16 sticky">
          <Step element="sticker" />
        </div>
      </div>
    </Steps>
  )
}

function ScrollableContent({ steps }: { steps: any[] }) {
  return (
    <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert">
      {steps.map((step: any, i: number) => (
        <ScrollyStep
          key={i}
          stepIndex={i}
          className={
            "border-l-4 border-zinc-700 data-[ch-selected]:border-blue-400" +
            " px-5 py-2 mb-24 rounded bg-zinc-900"
          }
        >
          <h2 className="mt-4 text-xl">{step.title}</h2>
          <div>{step.children}</div>
        </ScrollyStep>
      ))}
    </div>
  )
}

async function Code({
  codeblock,
}: {
  codeblock: CodeBlock
}) {
  const info = await highlight(codeblock, "github-dark")
  return (
    <CodeRender info={info} className="min-h-[40rem]" />
  )
}
