"use client"

import { HighlightedCode, Pre, AnnotationHandler } from "codehike/code"
import React, { forwardRef, useLayoutEffect, useRef, useState } from "react"

const ranges = {
  lorem: { fromLineNumber: 1, toLineNumber: 5 },
  ipsum: { fromLineNumber: 7, toLineNumber: 11 },
  dolor: { fromLineNumber: 11, toLineNumber: 15 },
}

function useScrollToFocus(ref: React.RefObject<HTMLPreElement>) {
  const firstRender = useRef(true)
  useLayoutEffect(() => {
    if (ref.current) {
      // find all descendants whith data-focus="true"
      const focusedElements = ref.current.querySelectorAll(
        "[data-focus=true]",
      ) as NodeListOf<HTMLElement>

      // container rect
      const containerRect = ref.current.getBoundingClientRect()

      // find top and bottom of the focused elements
      let top = Infinity
      let bottom = -Infinity
      focusedElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        top = Math.min(top, rect.top - containerRect.top)
        bottom = Math.max(bottom, rect.bottom - containerRect.top)
      })

      // scroll to the focused elements if any part of them is not visible
      if (bottom > containerRect.height || top < 0) {
        ref.current.scrollTo({
          top: ref.current.scrollTop + top - 10,
          behavior: firstRender.current ? "instant" : "smooth",
        })
      }
      firstRender.current = false
    }
  })
}

export function CodeContainer({ code }: { code: HighlightedCode }) {
  const [focused, setFocused] = useState<"lorem" | "ipsum" | "dolor">("dolor")

  return (
    <>
      <Pre
        className="m-0 px-0 max-h-72 scroll-smooth overflow-auto bg-zinc-950"
        code={{
          ...code,
          annotations: [
            {
              name: "Focus",
              query: "",
              ...ranges[focused],
            },
          ],
        }}
        handlers={[focus]}
      />
      <div className="p-2 mt-auto font-light text-center">
        You can also change the focus annotations on a rendered codeblock:
      </div>
      <div className="flex justify-center gap-2 pb-4">
        <button
          onClick={() => setFocused("lorem")}
          disabled={focused === "lorem"}
          className="border border-current rounded px-2 disabled:opacity-60"
        >
          focus `lorem`
        </button>{" "}
        <button
          onClick={() => setFocused("dolor")}
          disabled={focused === "dolor"}
          className="border border-current rounded px-2 disabled:opacity-60"
        >
          focus `dolor`
        </button>
      </div>
    </>
  )
}

const focus: AnnotationHandler = {
  name: "Focus",
  Pre: forwardRef(({ InnerPre, ...props }, ref) => {
    ref = useRef<HTMLPreElement>(null)
    useScrollToFocus(ref)
    return <InnerPre {...props} ref={ref} />
  }),
  Line: ({ InnerLine, ...props }) => (
    <InnerLine
      merge={props}
      className="opacity-50 data-[focus]:opacity-100 px-2"
    />
  ),
  AnnotatedLine: ({ InnerLine, annotation, ...props }) => (
    <InnerLine merge={props} data-focus={true} className="bg-zinc-700/30" />
  ),
}

// from https://stackoverflow.com/questions/73015696/whats-the-difference-between-reacts-forwardedref-and-refobject
function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
  const innerRef = React.useRef<T>(null)

  React.useLayoutEffect(() => {
    if (!ref) return
    if (typeof ref === "function") {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  })

  return innerRef
}
