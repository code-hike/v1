import { AnnotationHandler, InnerLine } from "codehike/code"
import { cn } from "@/lib/utils"

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const n = Number(annotation?.query || "2") % bgs.length
    const bg = bgs[n]
    const border = borders[n]

    return (
      <div
        data-mark={annotation ? "true" : undefined}
        className={cn(
          "border-l-2",
          annotation ? border : "border-transparent",
          annotation ? bg : "",
        )}
      >
        <InnerLine merge={props} />
      </div>
    )
  },
}

const bgs = [
  "bg-green-500/10",
  "bg-teal-500/10",
  "bg-sky-500/10",
  "bg-violet-500/10",
  "bg-fuchsia-500/10",
  "bg-pink-500/10",
]

const borders = [
  "border-green-500",
  "border-teal-500",
  "border-sky-500",
  "border-violet-500",
  "border-fuchsia-500",
  "border-pink-500",
]
