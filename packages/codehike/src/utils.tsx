"use client"
import React from "react"

const StepsContext = React.createContext<{
  selectedIndex: number
  selectIndex: (stepIndex: number) => void
}>({
  selectedIndex: 0,
  selectIndex: () => {},
})

export function Steps({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const [selectedIndex, selectIndex] = React.useState<number>(0)
  return (
    <div data-selected-index={selectedIndex} {...rest}>
      <StepsContext.Provider
        value={{
          selectedIndex,
          selectIndex,
        }}
      >
        {children}
      </StepsContext.Provider>
    </div>
  )
}

export function Step({
  index,
  selectOn = ["click"],
  ...rest
}: {
  index: number
  selectOn?: ("click" | "hover" | "scroll")[]
} & React.HTMLAttributes<HTMLDivElement>) {
  const { selectedIndex, selectIndex } = React.useContext(StepsContext)
  const eventHandlers = React.useMemo(() => {
    const handlers: Record<string, () => void> = {}
    if (selectOn.includes("click")) {
      handlers.onClick = () => selectIndex(index)
    }
    if (selectOn.includes("hover")) {
      handlers.onMouseEnter = () => selectIndex(index)
    }
    return handlers
  }, [index, selectIndex, selectOn])
  return (
    <div data-selected={selectedIndex === index} {...eventHandlers} {...rest} />
  )
}

export function Display({ values }: { values: React.ReactNode[] }) {
  const { selectedIndex } = React.useContext(StepsContext)
  return values[selectedIndex]
}

export function useStepIndex() {
  const { selectedIndex, selectIndex } = React.useContext(StepsContext)
  return [selectedIndex, selectIndex] as const
}
