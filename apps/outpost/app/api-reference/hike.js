"use client"
import React from "react"

export function HikeLayout({ hike }) {
  const { slots, children } = hike
  const { steps } = slots

  const [step, setStep] = React.useState(steps[0])
  const code = step.slots["code"]
    ? step.slots["code"][0].children
    : hike.slots["code"][0].children

  return (
    <div className="relative flex flex-row gap-12">
      <div className="flex-1">
        {children}
        {steps.map((step, i) => (
          <Step step={step} setStep={setStep} key={i} />
        ))}
      </div>
      <div style={{ maxWidth: 400, minWidth: 400 }}>
        <div className="sticky top-10">{code}</div>
      </div>
    </div>
  )
}

function Step({ step, setStep }) {
  const [name, ...rest] = step.query.split(" ")
  const type = rest.join(" ")

  return (
    <div
      onMouseEnter={() => setStep(step)}
      className="mb-4 border-t border-zinc-300/20 "
    >
      <h4>
        <span className="font-mono">{name}</span>
        <span className="ml-2 text-sm text-slate-400">{type}</span>
      </h4>
      {step["children"]}
      <SubSteps steps={step.slots.steps} setStep={setStep} />
    </div>
  )
}

function SubSteps({ steps, setStep }) {
  const [collapsed, setCollapsed] = React.useState(true)
  if (!steps || steps.length === 0) return null

  if (collapsed) {
    return (
      <div
        className="hover:neutral-800 cursor-pointer rounded-xl border border-zinc-300/20 px-4 py-1 text-zinc-400 hover:text-slate-50 select-none"
        onClick={() => setCollapsed(false)}
      >
        Show child attributes
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-300/20 px-4 py-1 ">
      <header
        className=" cursor-pointer pb-1 text-zinc-400 hover:text-slate-50 select-none"
        onClick={() => setCollapsed(true)}
      >
        Hide child attributes
      </header>
      {steps.map((step, i) => (
        <Step step={step} setStep={setStep} key={i} />
      ))}
    </div>
  )
}
