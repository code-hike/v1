import { AnnotationHandler, InnerLine } from "codehike/code"

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const n = Number(annotation?.query || "2") % colors.length
    const color = colors[n]

    return (
      <div
        style={{
          borderLeft: "solid 2px transparent",
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.13)`,
        }}
        className="flex"
      >
        <InnerLine merge={props} className="px-2 flex-1" />
      </div>
    )
  },
}

const colors = [
  "#22c55e",
  "#14b8a6",
  "#0ea5e9",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
]
