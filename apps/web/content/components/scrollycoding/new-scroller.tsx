"use client"
import React from "react"
import { Scroller, ScrollerStep } from "./scroller"

const StepIndexContext = React.createContext<number>(0)

export function ScrollyRoot({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  return (
    <Scroller onStepChange={setSelectedIndex} triggerPosition="40%">
      <StepIndexContext.Provider value={selectedIndex}>
        <div className={className} data-ch-selected-index={selectedIndex}>
          {children}
        </div>
      </StepIndexContext.Provider>
    </Scroller>
  )
}

export function ScrollyStep({
  children,
  className,
  stepIndex,
}: {
  children: React.ReactNode
  className?: string
  stepIndex: number
}) {
  const selectedIndex = React.useContext(StepIndexContext)
  return (
    <ScrollerStep
      key={stepIndex}
      index={stepIndex}
      className={className}
      data-ch-selected={selectedIndex === stepIndex ? true : undefined}
    >
      {children}
    </ScrollerStep>
  )
}

export function ScrollySticker({
  stickers,
  className,
}: {
  stickers: React.ReactNode[]
  className?: string
}) {
  const selectedIndex = React.useContext(StepIndexContext)
  return <div className={className}>{stickers[selectedIndex]}</div>
}
