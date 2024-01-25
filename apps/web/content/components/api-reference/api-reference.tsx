import React from "react"
import {
  CodeBlock,
  CodeContent,
  HikeSection,
} from "codehike"
import { ExtraProperty, Property } from "./property"
import { z } from "../../../ui/z"

const HikeSchema = z.hike({
  main: z.section({
    steps: z.sections({
      steps: z.optional(z.sections({})),
    }),
  }),
  extra: z.section({
    steps: z.sections({}),
  }),
  returns: z.optional(z.section({})),
  code: z.codeblock(),
})

export async function APIReference({
  hike,
}: {
  hike: HikeSection
}) {
  const data = HikeSchema.parse(hike)

  const { main, extra, returns, code } = data

  return (
    <div className="relative flex flex-row gap-12 mb-24">
      <div className="flex-1">
        {/* Main Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">
            {main.query}
          </h3>
          {main.steps.map((property, i) => (
            <Property property={property} key={i} />
          ))}
        </section>
        {/* Extra Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">
            {extra.query}
          </h3>
          {extra.steps.map((property, i) => (
            <ExtraProperty property={property} key={i} />
          ))}
        </section>
        {/* Returns */}
        {returns && (
          <div>
            <h3 className="mt-8 border-b border-zinc-700">
              Returns
            </h3>
            {returns.children}
          </div>
        )}
      </div>
      <div className="not-prose max-w-sm w-full">
        <div className="sticky top-10">
          <Code codeblock={code} />
        </div>
      </div>
    </div>
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
