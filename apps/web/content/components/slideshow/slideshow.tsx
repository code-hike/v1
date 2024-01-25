import { CodeContent, CodeBlock } from "codehike"
import { Slides, Controls } from "./slides"

export function Slideshow({ hike }: { hike: any }) {
  const slides = hike.steps.map((step: any, i: number) => (
    <div>
      <Code codeblock={step.code[0]} />
      <Controls length={hike.steps.length} />
      {step.children}
    </div>
  ))

  return <Slides slides={slides} />
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-dark" }}
      className="min-h-[40rem] !bg-zinc-900"
    />
  )
}
