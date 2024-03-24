"use client"

import {
  BlockAnnotationComponent,
  CodeInfo,
  CodeRender,
  LineAnnotationComponent,
  LineComponent,
} from "codehike/code"
import { useLayoutEffect, useRef, useState } from "react"

export function CodeContainer({
  info,
}: {
  info: CodeInfo
}) {
  const ref = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const [lineNumber, setLineNumber] = useState(15)

  useLayoutEffect(() => {
    if (ref.current) {
      // find all descendants whith data-focus="true"
      const focusedElements = ref.current.querySelectorAll(
        "[data-focus=true]",
      ) as NodeListOf<HTMLElement>

      // container rect
      const containerRect =
        ref.current.getBoundingClientRect()

      // find top and bottom of the focused elements
      let top = Infinity
      let bottom = -Infinity
      focusedElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        top = Math.min(top, rect.top - containerRect.top)
        bottom = Math.max(
          bottom,
          rect.bottom - containerRect.top,
        )
      })

      // scroll to the focused elements if any part of them is not visible
      if (bottom > containerRect.height || top < 0) {
        ref.current.scrollTo({
          top: ref.current.scrollTop + top - 10,
          behavior: firstRender.current
            ? "instant"
            : "smooth",
        })
      }
      firstRender.current = false
    }
  })
  return (
    <div>
      <div
        className="max-h-48 scroll-smooth border border-red-400 overflow-auto"
        ref={ref}
      >
        <CodeRender
          className="m-0 px-0"
          info={{
            ...info,
            annotations: [
              {
                name: "Focus",
                query: "",
                fromLineNumber: lineNumber,
                toLineNumber: lineNumber,
              },
            ],
          }}
          components={{ LineFocus, Line }}
        />
      </div>
      <form
        className="flex items-center space-x-2"
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.querySelector(
            "input",
          ) as HTMLInputElement
          setLineNumber(parseInt(input.value))
        }}
      >
        <label htmlFor="line-number">Line number:</label>
        <input id="line-number" type="number" />
        <button type="submit">Go</button>
      </form>
    </div>
  )
}

export const LineFocus: LineAnnotationComponent = ({
  children,
  annotation,
}) => {
  return (
    <div
      data-focus={true}
      className="opacity-50 data-[focus]:opacity-100 bg-zinc-500/30 px-2"
    >
      {children}
    </div>
  )

  // Line
}

export const Line: LineComponent = ({ children }) => {
  return (
    <div className="opacity-50 data-[focus]:opacity-100 transition-opacity px-2">
      {children}
    </div>
  )
}
