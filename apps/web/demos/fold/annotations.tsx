"use client"

import { AnnotationComponents } from "codehike/code"
import { useState } from "react"

export const Inline: AnnotationComponents["Inline"] = ({
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
