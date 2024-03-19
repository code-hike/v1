"use client"
import { BlockAnnotationComponent, LineComponent } from "codehike/code"
import { ChevronDownIcon } from "lucide-react"
import { createContext, useContext, useState } from "react"

const CollapseContext = createContext({
  startLine: 0,
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
})

export const BlockCollapse: BlockAnnotationComponent = ({
  children,
  annotation,
}) => {
  const { query, fromLineNumber } = annotation
  const [collapsed, setCollapsed] = useState(query === "collapsed")

  return (
    <CollapseContext.Provider
      value={{
        startLine: fromLineNumber,
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </CollapseContext.Provider>
  )
}

function useCollapse(lineNumber: number) {
  const { startLine, collapsed, setCollapsed } = useContext(CollapseContext)
  console.log({
    lineNumber,
    startLine,
  })
  return {
    isHeader: lineNumber === startLine,
    isCollapsed: collapsed,
    setCollapsed,
  }
}

export const Line: LineComponent = ({ children, lineNumber }) => {
  const { isHeader, isCollapsed, setCollapsed } = useCollapse(lineNumber)
  if (isHeader) {
    return (
      <div
        data-line="true"
        className="group px-2"
        onClick={() => setCollapsed(!isCollapsed)}
        data-collapsed={isCollapsed}
      >
        <span className="pr-1 inline-block w-[2ch] box-content !opacity-50 text-right select-none">
          {lineNumber}
        </span>
        <ChevronDownIcon
          className="inline-block mr-1 group-data-[collapsed=true]:-rotate-90 transition select-none opacity-50 group-data-[collapsed=true]:opacity-80 group-hover:!opacity-100"
          size={15}
        />

        {children}
      </div>
    )
  }
  if (isCollapsed) {
    return null
  }
  return (
    <div data-line="true" className="px-2">
      <span className="pr-1 inline-block w-[2ch] box-content !opacity-50 text-right select-none">
        {lineNumber}
      </span>
      <ChevronDownIcon className="inline-block mr-1 opacity-0" size={15} />
      {children}
    </div>
  )
}

function CollapseLine({ lineNumber }: { lineNumber: number }) {
  const { isHeader, isCollapsed, setCollapsed } = useCollapse(lineNumber)
}

function BaseLine({
  children,
  lineNumber,
  icon,
}: {
  children: any
  lineNumber: number
  icon: React.ReactNode
}) {
  return (
    <div data-line="true" className="px-2">
      <span className="pr-1 inline-block w-[2ch] box-content !opacity-50 text-right select-none">
        {lineNumber}
      </span>
      <span className="w-8 inline-block">{icon}</span>
      {children}
    </div>
  )
}
