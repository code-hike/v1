"use client"

import { Copy, Check } from "lucide-react"
import * as React from "react"

export function CopyButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      className={`hover:bg-zinc-700 -m-1 p-1 rounded ${className}`}
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check size={16} className="text-green-300" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  )
}
