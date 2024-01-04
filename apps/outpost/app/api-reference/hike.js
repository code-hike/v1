import React from "react"
import { Code } from "./code"
import { Extra, Main } from "./hike.client"
import theme from "../../theme.mjs"

export function HikeLayout({ hike }) {
  const { slots, children } = hike
  const main = slots["main"][0]
  const extra = slots["extra"][0]
  const returns = slots["returns"] && slots["returns"][0]

  // const [step, setStep] = React.useState(steps[0])
  const codeblocks = hike.code

  return (
    <div className="relative flex flex-row gap-12 mb-24">
      <div className="flex-1">
        <Main query={main.query} steps={main.slots.steps} />
        <Extra query={extra.query} steps={extra.slots.steps} />
        {returns && (
          <div>
            <h3 className="mt-8 border-b border-zinc-700">Returns</h3>
            {returns.children}
          </div>
        )}
      </div>
      <div className="not-prose max-w-sm w-full">
        <div className="sticky top-10">
          <Code
            codeblocks={codeblocks}
            config={{ theme, themeName: theme.name }}
            components={{}}
          />
        </div>
      </div>
    </div>
  )
}
