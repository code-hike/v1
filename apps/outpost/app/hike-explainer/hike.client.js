"use client"
import React from "react"
import { cn } from "../../lib/utils"
import { Scroller, ScrollerStep } from "./scroller"

export function Slideshow({ steps, children }) {
  const [stepIndex, setStepIndex] = React.useState(0)
  const step = steps[stepIndex]
  const { left, right } = step

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="snap-start min-w-full relative h-[300px] prose prose-invert flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="flex flex-row gap-2 top-10 h-0 sticky">
        {left}
        {right}
      </div>
      <Scroller onStepChange={setStepIndex} triggerPosition="400px">
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
      </Scroller>
    </div>
  )
}

function Message({ children, className }) {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    setShow(true)
  }, [])

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
