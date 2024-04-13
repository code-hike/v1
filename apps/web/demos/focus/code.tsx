"use client"

import {
  HighlightedCode,
  Pre,
  LineAnnotationComponent,
  LineComponent,
  AnnotationComponents,
} from "codehike/code"
import { useLayoutEffect, useRef, useState } from "react"

const ranges = {
  lorem: { fromLineNumber: 1, toLineNumber: 5 },
  ipsum: { fromLineNumber: 7, toLineNumber: 11 },
  dolor: { fromLineNumber: 13, toLineNumber: 17 },
}

export function CodeContainer({ code }: { code: HighlightedCode }) {
  const ref = useRef<HTMLPreElement>(null)
  const firstRender = useRef(true)
  const [focused, setFocused] = useState<"lorem" | "ipsum" | "dolor">("dolor")

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
  return (
    <>
      <Pre
        className="m-0 px-0 max-h-72 scroll-smooth overflow-auto bg-zinc-950"
        ref={ref}
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
        components={[focus]}
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

const focus: AnnotationComponents = {
  name: "Focus",
  Line: ({ InnerLine, ...props }) => (
    <InnerLine
      base={props}
      className="opacity-50 data-[focus]:opacity-100 px-2"
    />
  ),
  AnnotatedLine: ({ InnerLine, annotation, ...props }) => (
    <InnerLine base={props} data-focus={true} className="bg-zinc-700/30" />
  ),
}
