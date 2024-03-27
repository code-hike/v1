"use client"

import {
  CodeInfo,
  CodeRender,
  TokenComponent,
} from "codehike/code"
import React from "react"

export function CodeWithOccurrences({
  info,
}: {
  info: CodeInfo
}) {
  const ref = React.useRef<HTMLPreElement>(null)
  React.useEffect(() => {
    const handler: EventListener = (e) => {
      const selected = document
        .getSelection()!
        .toString()
        .trim()
      ref
        .current!.querySelectorAll("span:not(:has(*))")
        .forEach((element) => {
          if (element.textContent === selected) {
            element.setAttribute("data-selected", "true")
          } else {
            element.removeAttribute("data-selected")
          }
        })
    }
    document.addEventListener("selectionchange", handler)
    return () => {
      document.removeEventListener(
        "selectionchange",
        handler,
      )
    }
  }, [])

  return (
    <CodeRender
      ref={ref}
      info={info}
      components={{ Token }}
    />
  )
}

const Token: TokenComponent = ({ value, ...props }) => {
  return (
    <span
      {...props}
      className="data-[selected]:bg-blue-500/40 data-[selected]:rounded"
    >
      {value}
    </span>
  )
}
