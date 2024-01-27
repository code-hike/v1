"use client"

import { Copy } from "lucide-react"

export function CopyButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <button
      className={`hover:bg-zinc-700 -m-1 p-1 rounded ${className}`}
      onClick={() => {
        navigator.clipboard.writeText(text)
      }}
      aria-label="Copy to clipboard"
    >
      <Copy size={16} />
    </button>
  )
}
