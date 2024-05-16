"use client"

import { Selectable, useStepIndex } from "codehike/utils"
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react"
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
    <div>
      <nav className="flex mt-4 w-screen">
        {blocks.map((block, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click"]}
            className="flex-1 h-2 bg-zinc-200 data-[selected=true]:bg-blue-400 cursor-pointer transition-colors duration-200 ease-in-out"
          />
        ))}
      </nav>
      <div className="flex w-screen">
        <button
          className="flex-1 bg-blue-500 text-white p-2 h-16"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
        >
          <ArrowLeft className="mx-auto" />
        </button>
        <button
          className="flex-1 bg-blue-500 text-white p-2 h-16 "
          onClick={() => setIndex((i) => Math.min(i + 1, blocks.length - 1))}
        >
          <ArrowRight className="mx-auto" />
        </button>
      </div>
    </div>
  )
}
