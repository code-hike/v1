import React from "react"
import { ExtraProperty, Property } from "./property"
import { Code } from "./code"
import { HikeSection } from "codehike"

export async function HikeLayout({
  hike,
}: {
  hike: HikeSection<"main" | "extra" | "returns" | "steps">
}) {
  const main = hike.main?.[0]!
  const extra = hike.extra?.[0]!
  const returns = hike.returns?.[0]
  const codeblocks = hike.code!

  return (
    <div className="relative flex flex-row gap-12 mb-24">
      <div className="flex-1">
        {/* Main Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">{main.query}</h3>
          {main.steps!.map((property, i) => (
            <Property property={property} key={i} />
          ))}
        </section>
        {/* Extra Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">{extra.query}</h3>
          {extra.steps!.map((property, i) => (
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
          <Code codeblocks={codeblocks} />
        </div>
      </div>
    </div>
  )
}
