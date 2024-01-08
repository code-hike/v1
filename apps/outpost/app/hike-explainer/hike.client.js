"use client"
import React from "react"
import { cn } from "../../lib/utils"

export function Slideshow({ steps }) {
  const [stepIndex, setStepIndex] = React.useState(0)
  const step = steps[stepIndex]
  const { left, right, messages } = step

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="flex flex-row gap-2 pt-8">
        {left}
        {right}
      </div>
      <nav className="flex justify-center mt-2 gap-2 text-xs">
        <button
          className="border border-sky-800 hover:bg-sky-900 px-4 rounded"
          onClick={() =>
            setStepIndex((stepIndex - 1 + steps.length) % steps.length)
          }
        >
          Prev
        </button>
        {steps.map((_, i) => (
          <button
            className={`border border-sky-800 hover:bg-sky-900 px-2 rounded flex-1 ${
              i === stepIndex ? "bg-sky-900" : "text-zinc-200"
            }`}
            onClick={() => setStepIndex(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="border border-sky-800 hover:bg-sky-900 py-1 px-4 rounded"
          onClick={() => setStepIndex((stepIndex + 1) % steps.length)}
        >
          Next
        </button>
      </nav>

      {messages.map(({ className, children }) => (
        <Message className={className} key={stepIndex}>
          {children}
        </Message>
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
