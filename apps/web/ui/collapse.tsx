"use client"
import { ChevronDown, ChevronDownIcon } from "lucide-react"
import { createContext, useContext, useState } from "react"

const CollapseContext = createContext({
  startLine: 0,
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
})

export function Collapse({ children, query, data }: any) {
  const [collapsed, setCollapsed] = useState(query === "collapsed")
  const { inline, fromLineNumber, toLineNumber } = data
  if (inline) {
    console.log("Inline collapse not supported")
    return children
  }
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

export function Line({ children, query }: any) {
  const { isHeader, isCollapsed, setCollapsed } = useCollapse(Number(query))
  if (isHeader) {
    return (
      <div
        data-line="true"
        className="group px-2"
        onClick={() => setCollapsed(!isCollapsed)}
        data-collapsed={isCollapsed}
      >
        <span className="pr-1 inline-block w-[2ch] box-content !opacity-50 text-right select-none">
          {query}
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
        {query}
      </span>
      <ChevronDownIcon className="inline-block mr-1 opacity-0" size={15} />
      {children}
    </div>
  )
}
