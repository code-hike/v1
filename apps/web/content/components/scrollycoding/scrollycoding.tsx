import { ScrollyRoot, ScrollyStep, ScrollySticker } from "./new-scroller"
import { CodeContent, CodeBlock } from "codehike"

export function Scrollycoding({ hike }: { hike: any }) {
  const stickers = hike.steps.map((step: any, i: number) => (
    <Code codeblock={step.code[0]} />
  ))

  return (
    <ScrollyRoot className="flex gap-4">
      <div className="flex-1 mt-32 mb-[90vh]">
        {hike.steps.map((step: any, i: number) => (
          <Step key={i} index={i} title={step.query}>
            {step.children}
          </Step>
        ))}
      </div>
      <div className="w-[40vw] bg-zinc-900">
        <ScrollySticker className="top-16 sticky" stickers={stickers} />
      </div>
    </ScrollyRoot>
  )
}

function Step({ children, title, index }: any) {
  return (
    <ScrollyStep stepIndex={index}>
      <div className="border-l-4 px-5 py-2 [[data-ch-selected]_&]:border-blue-500 mb-24 rounded bg-zinc-900">
        <h2 className="mt-4 text-xl">{title}</h2>
        <div>{children}</div>
      </div>
    </ScrollyStep>
  )
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-dark" }}
      className="min-h-[40rem]"
    />
  )
}
