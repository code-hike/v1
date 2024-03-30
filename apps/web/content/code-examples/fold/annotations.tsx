"use client"

import { InlineAnnotationComponent } from "codehike/code"
import { useState } from "react"

export const InlineFold: InlineAnnotationComponent = ({
  children,
}) => {
  const [folded, setFolded] = useState(true)
  if (!folded) {
    return children
  }
  return (
    <button
      onClick={() => setFolded(false)}
      aria-label="Expand"
    >
      ...
    </button>
  )
}
