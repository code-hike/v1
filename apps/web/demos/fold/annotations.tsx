"use client"

import { AnnotationHandler } from "codehike/code"
import { useState } from "react"

export const Inline: AnnotationHandler["Inline"] = ({
  annotation,
  children,
}) => {
  const [folded, setFolded] = useState(true)
  if (!folded) {
    return children
  }
  return (
    <button onClick={() => setFolded(false)} aria-label="Expand">
      ...
    </button>
  )
}
