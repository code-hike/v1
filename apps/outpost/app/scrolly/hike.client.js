"use client"
import React from "react"
import { cn } from "../../lib/utils"

export function Slideshow({ steps, children }) {
  const [stepIndex, setStepIndex] = React.useState(0)
  const step = steps[stepIndex]
  const { left, right } = step

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="snap-start min-w-full relative h-[300px] prose prose-invert flex items-center justify-center">
        {children}
      </div>
      <div className="flex flex-row gap-2 top-10 h-0 sticky">
        {left}
        {right}
      </div>
      {steps.map((s, i) => (
        <section
          key={i}
          className="snap-start outline outline-red-500 opacity-90 z-10 relative h-[500px] scroll-mt-10"
        >
          <Message className={s.className}>{s.children}</Message>
        </section>
      ))}
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
        `absolute bg-sky-800 p-4 rounded shadow-md prose prose-invert leading-5 transition delay-500  duration-300`,
        className,
      )}
      style={{
        opacity: show ? 0.9 : 0,
        transform: show ? "translateX(0)" : "translateX(15px)",
        transitionTimingFunction: "ease",
      }}
    >
      {children}
    </div>
  )
}
