import { AnnotationHandler } from "codehike/code"

const colors = [
  "bg-green-500/20",
  "bg-teal-500/20",
  "bg-sky-500/20",
  "bg-violet-500/20",
  "bg-fuchsia-500/20",
  "bg-pink-500/20",
  // if adding more colors, dont forget to update global.css
]

export const ruler: AnnotationHandler = {
  name: "ruler",
  Block: ({ annotation, children }) => {
    const n = Number(annotation.query || "1")
    const bg = colors[n % colors.length]
    return (
      <div className="relative" data-hover={n}>
        <div
          className={`absolute top-0.5 bottom-0.5 left-0.5 w-[3px] rounded-sm ${bg}`}
        />
        <div
          className={`absolute inset-0 ${bg} opacity-0 transition-opacity bg`}
        />
        <div className="relative">{children}</div>
      </div>
    )
  },
}
