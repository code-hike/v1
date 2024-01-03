"use client"
import React from "react"
import { ChevronRight } from "lucide-react"

export function HikeLayout({ hike }) {
  const { slots, children } = hike
  const main = slots["main"][0]
  const extra = slots["extra"][0]
  const returns = slots["returns"] && slots["returns"][0]

  // const [step, setStep] = React.useState(steps[0])
  const code = hike.slots["code"][0].children

  return (
    <div className="relative flex flex-row gap-12 mb-24">
      <div className="flex-1">
        <Main query={main.query} steps={main.slots.steps} />
        <Extra query={extra.query} steps={extra.slots.steps} />
        {returns && (
          <div>
            <h3>Returns</h3>
            {returns.children}
          </div>
        )}
      </div>
      <div className="not-prose max-w-sm w-full">
        <div className="sticky top-10">{code}</div>
      </div>
    </div>
  )
}

function Main({ query, steps }) {
  const setStep = () => {}
  return (
    <section>
      <h3 className="mt-8">{query}</h3>
      {steps.map((step, i) => (
        <Step step={step} setStep={setStep} key={i} />
      ))}
    </section>
  )
}

function Extra({ query, steps }) {
  const setStep = () => {}
  return (
    <section>
      <h3 className="mt-8">{query}</h3>
      {steps.map((step, i) => (
        <ExtraAttribute step={step} setStep={setStep} key={i} />
      ))}
    </section>
  )
}

function ExtraAttribute({ step, setStep }) {
  const [collapsed, setCollapsed] = React.useState(true)
  const [name, ...rest] = step.query.split(" ")
  const type = rest.join(" ")

  return (
    <div onMouseEnter={() => setStep(step)} className="mb-4">
      <h4 onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
        <ChevronRight
          size={16}
          className={`inline-block mr-1 -ml-5 transform ${
            collapsed ? "" : "rotate-90"
          } transition-transform`}
        />
        <span className="font-mono">{name}</span>
        <span className="ml-2 text-sm text-slate-400">{type}</span>
      </h4>
      <div className={collapsed ? "hidden" : ""}>
        {step["children"]}
        <SubSteps steps={step.slots.steps} setStep={setStep} />
      </div>
    </div>
  )
}

function Step({ step, setStep }) {
  const [name, ...rest] = step.query.split(" ")
  const type = rest.join(" ")

  return (
    <div onMouseEnter={() => setStep(step)} className="mb-6">
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
