import { AnnotationHandler } from "codehike/code"

export const pill: AnnotationHandler = {
  name: "pill",
  Inline: ({ annotation, children }) => {
    return (
      <span className="bg-cyan-500/20 dark:bg-cyan-400/20 p-0.5 -m-0.5 rounded">
        {children}
      </span>
    )
  },
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-cyan-500/20 dark:bg-cyan-400/20 p-0.5 -m-0.5 rounded"
      style={{ color: "var(--ch-2)" }}
    >
      {children}
    </span>
  )
}
