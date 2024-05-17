"use client"

import { Selectable, useStepIndex } from "codehike/utils"
import { useLayoutEffect } from "react"

export default function Nav({ blocks }: { blocks: any[] }) {
  const [index, setIndex] = useStepIndex()

  useLayoutEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        setIndex((i) => Math.min(i + 1, blocks.length - 1))
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setIndex((i) => Math.max(i - 1, 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [blocks.length, setIndex])

  return (
    <nav className="flex my-4 gap-2">
      {blocks.map((block, i) => (
        <Selectable
          key={i}
          index={i}
          selectOn={["click"]}
          className="rounded-full w-2 h-2 bg-zinc-400 data-[selected=true]:bg-blue-500 cursor-pointer transition-colors duration-200 ease-in-out"
        />
      ))}
    </nav>
  )
}
