"use client"
import React from "react"

export function Slideshow({ steps }) {
  const [stepIndex, setStepIndex] = React.useState(0)
  const step = steps[stepIndex]
  const { left, right, caption } = step

  return (
    <div>
      <div className="flex flex-row gap-2 mx-auto max-w-4xl pt-8">
        {left}
        {right}
      </div>
      <div className="flex flex-col justify-between mx-auto max-w-4xl mt-2 bg-sky-950 rounded p-4 h-64">
        <div className="">{caption}</div>
        <nav className="ml-auto">
          <button
            className="border border-sky-800 hover:bg-sky-900 py-1 px-4 rounded"
            onClick={() =>
              setStepIndex((stepIndex - 1 + steps.length) % steps.length)
            }
          >
            Prev
          </button>
          <button
            className="border border-sky-800 hover:bg-sky-900  py-1 px-4 rounded ml-2"
            onClick={() => setStepIndex((stepIndex + 1) % steps.length)}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}
