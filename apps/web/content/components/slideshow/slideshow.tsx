import { CodeContent, CodeBlock } from "codehike"
import { Slides, Controls } from "./slides"

export function Slideshow({ hike }: { hike: any }) {
  return (
    <Slides
      slides={hike.steps.map((step: any) => (
        <div>
          <Controls length={hike.steps.length} />
          <Code codeblock={step.code} />
          <Controls length={hike.steps.length} />
          <div className="h-40 px-6">{step.children}</div>
        </div>
      ))}
    />
  )
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-dark" }}
      className="min-h-[40rem] !bg-zinc-900 m-0 rounded-none"
    />
  )
}
