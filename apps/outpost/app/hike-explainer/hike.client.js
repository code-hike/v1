"use client"
import React from "react"

export function Slideshow({ steps }) {
  const [stepIndex, setStepIndex] = React.useState(0)
  const step = steps[stepIndex]
  const { left, right } = step

  return (
    <div>
      <div className="flex flex-row gap-2 mx-auto max-w-4xl p-8">
        {left}
        {right}
      </div>
      <div className="flex flex-row justify-between mx-auto max-w-4xl p-8">
        <button
          className="bg-sky-800 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            setStepIndex((stepIndex - 1 + steps.length) % steps.length)
          }
        >
          Prev
        </button>
        <button
          className="bg-sky-800 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded"
          onClick={() => setStepIndex((stepIndex + 1) % steps.length)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
