"use client"
import React from "react"

const StepsContext = React.createContext<{
  steps: any[]
  selectedIndex: number
  selectIndex: (stepIndex: number) => void
}>({
  steps: [],
  selectedIndex: 0,
  selectIndex: () => {},
})

export function useSteps() {
  return React.useContext(StepsContext)
}

export function Steps({
  className,
  children,
  steps,
  triggerPosition = "40%",
}: {
  className?: string
  children: React.ReactNode
  steps: any[]
  triggerPosition?: TriggerPosition
}) {
  const [selectedIndex, selectIndex] = React.useState(0)
  return (
    <Scroller onStepChange={selectIndex} triggerPosition={triggerPosition}>
      <StepsContext.Provider
        value={{
          steps,
          selectedIndex,
          selectIndex,
        }}
      >
        <div className={className} data-ch-selected-index={selectedIndex}>
          {children}
        </div>
      </StepsContext.Provider>
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
  const { selectedIndex, selectIndex } = React.useContext(StepsContext)
  return (
    <ScrollerStep
      key={stepIndex}
      index={stepIndex}
      onClick={() => selectIndex(stepIndex)}
      className={className}
      data-ch-selected={selectedIndex === stepIndex ? true : undefined}
    >
      {children}
    </ScrollerStep>
  )
}

export function Step({ element }: { element: string }) {
  const { steps, selectedIndex } = React.useContext(StepsContext)
  const selectedStep = steps[selectedIndex]
  return selectedStep[element] as React.ReactNode
}

const ObserverContext = React.createContext<IntersectionObserver | undefined>(
  undefined,
)

const useLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

type ScrollerProps = {
  onStepChange: (stepIndex: number) => void
  children: React.ReactNode
  getRootMargin?: (vh: number, triggerPosition?: TriggerPosition) => string
  triggerPosition?: TriggerPosition
  debug?: boolean
}

type StepElement = {
  stepIndex: any
}

function Scroller({
  onStepChange,
  children,
  getRootMargin = defaultRootMargin,
  triggerPosition,
  debug = false,
}: ScrollerProps) {
  const [observer, setObserver] = React.useState<IntersectionObserver>()
  const vh = useWindowHeight()

  useLayoutEffect(() => {
    const windowHeight = vh || 0
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // if (debug || (window as any).chDebugScroller) {
      //   debugEntries(entries)
      // }
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          const stepElement = entry.target as unknown as StepElement
          onStepChange(+stepElement.stepIndex)
        }
      })
    }
    const observer = newIntersectionObserver(
      handleIntersect,
      getRootMargin(windowHeight, triggerPosition),
    )
    setObserver(observer)

    return () => observer.disconnect()
  }, [vh])

  return (
    <ObserverContext.Provider value={observer}>
      {children}
    </ObserverContext.Provider>
  )
}

function ScrollerStep({
  as = "div",
  index,
  ...props
}: {
  as?: any
  index: number
  children?: React.ReactNode
} & React.HTMLProps<HTMLElement>) {
  const ref = React.useRef<HTMLElement>(null!)
  const observer = React.useContext(ObserverContext)

  useLayoutEffect(() => {
    if (observer) {
      observer.observe(ref.current)
    }
    return () => observer && observer.unobserve(ref.current)
  }, [observer])

  useLayoutEffect(() => {
    const stepElement = ref.current as unknown as StepElement
    stepElement.stepIndex = index
  }, [index])

  return React.createElement(as, { ...props, ref })
}

function newIntersectionObserver(
  handleIntersect: IntersectionObserverCallback,
  rootMargin: string,
) {
  return new IntersectionObserver(handleIntersect, {
    rootMargin,
    threshold: 0.000001,
    root: null,
  })
}

type TriggerPosition = `${number}px` | `${number}%`

function defaultRootMargin(vh: number, triggerPosition = "50%") {
  let y = vh * 0.5

  if (triggerPosition.endsWith("%")) {
    const percent = parseFloat(triggerPosition.replace("%", ""))
    y = vh * (percent / 100)
  } else if (triggerPosition.endsWith("px")) {
    y = parseFloat(triggerPosition.replace("px", ""))
  }

  if (y < 0) {
    y = vh + y
  }

  return `-${y - 2}px 0px -${vh - y - 2}px`
}

function useWindowHeight() {
  const isClient = typeof window === "object"
  function getHeight() {
    return isClient ? document.documentElement.clientHeight : undefined
  }
  const [windowHeight, setWindowHeight] = React.useState(getHeight)
  React.useEffect(() => {
    function handleResize() {
      setWindowHeight(getHeight())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  useLayoutEffect(() => {
    // FIX when a horizontal scrollbar is added after the first layout
    setWindowHeight(getHeight())
  }, [])
  return windowHeight
}
