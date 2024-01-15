import React from "react"
import { ExtraProperty, Property } from "./property"
import { Code } from "./code"
import { HikeSection } from "codehike"
import { z } from "../../lib/z"

const HikeSchema = z.hike({
  main: z.section({
    steps: z.sections({}),
  }),
  extra: z.section({
    steps: z.sections({}),
  }),
  returns: z.optional(z.section({})),
  code: z.codeblocks(),
})

export async function HikeLayout({ hike }: { hike: HikeSection }) {
  const data = HikeSchema.parse(hike)

  const { main, extra, returns, code } = data

  return (
    <div className="relative flex flex-row gap-12 mb-24">
      <div className="flex-1">
        {/* Main Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">{main.query}</h3>
          {main.steps.map((property, i) => (
            <Property property={property} key={i} />
          ))}
        </section>
        {/* Extra Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">{extra.query}</h3>
          {extra.steps.map((property, i) => (
            <ExtraProperty property={property} key={i} />
          ))}
        </section>
        {/* Returns */}
        {returns && (
          <div>
            <h3 className="mt-8 border-b border-zinc-700">Returns</h3>
            {returns.children}
          </div>
        )}
      </div>
      <div className="not-prose max-w-sm w-full">
        <div className="sticky top-10">
          <Code codeblocks={code} />
        </div>
      </div>
    </div>
  )
}
