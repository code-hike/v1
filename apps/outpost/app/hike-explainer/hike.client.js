"use client"
import React from "react"
import { cn } from "../../lib/utils"
import { Scroller, ScrollerStep } from "./scroller"

export function Slideshow({ steps, children, footer }) {
  const [stepIndex, setStepIndex] = React.useState(0)
  const step = steps[stepIndex]
  const { left, right } = step

  return (
    <article className="max-w-4xl mx-auto mb-[100vh]">
      <div className="relative mb-24">
        <div className="snap-start min-w-full relative h-[300px] prose prose-invert flex flex-col items-center justify-center">
          {children}
        </div>
        <div className="flex flex-row gap-2 top-10 sticky ">
          {left}
          {right}
        </div>
        <Scroller onStepChange={setStepIndex} triggerPosition="400px">
          <div className="-mt-[500px]">
            {steps.map((s, i) => (
              <ScrollerStep
                key={i}
                index={i}
                data-selected={i === stepIndex ? "true" : "false"}
                className="snap-start z-10 relative h-[500px] scroll-mt-10 pointer-events-none "
              >
                <Message className={s.className}>{s.children}</Message>
              </ScrollerStep>
            ))}
          </div>
        </Scroller>
      </div>
      {footer.map((f, i) => (
        <section
          key={i}
          className="p-24 snap-start h-[500px] scroll-mt-10 prose prose-invert min-w-full"
        >
          {f.children}
        </section>
      ))}
    </article>
  )
}

function Message({ children, className }) {
  return (
    <div
      className={cn(
        `absolute pointer-events-auto bg-sky-800 p-4 rounded shadow-md prose prose-invert leading-normal opacity-90`,
        className,
      )}
    >
      {children}
    </div>
  )
}
