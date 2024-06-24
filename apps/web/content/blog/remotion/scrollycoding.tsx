import { z } from "zod"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { Code } from "@/components/code"

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
})

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema)
  return (
    <SelectionProvider className="flex gap-4 -mx-8">
      <div className="flex-1 min-w-0 mb-[40vh]">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="opacity-50 data-[selected=true]:opacity-100 transition-opacity duration-300"
          >
            {step.children}
          </Selectable>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <div className="top-20 sticky">
          <Selection
            from={steps.map((step) => (
              <Code
                codeblock={step.code}
                className="my-0 max-h-[calc(100vh-6rem)] h-screen flex flex-col"
              />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}
