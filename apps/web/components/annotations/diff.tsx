import { AnnotationHandler, InnerLine } from "codehike/code"

const styles = {
  ins: { borderColor: "#3fb9504d", background: "#2ea04326", icon: "+" },
  del: { borderColor: "#f851494d", background: "#f8514926", icon: "-" },
  none: { borderColor: "transparent" },
} as any

export const diff: AnnotationHandler = {
  name: "diff",
  onlyIfAnnotated: true,
  Line: ({ annotation, ...props }) => {
    const query = annotation?.query || "none"
    const { background, borderColor, icon } = styles[query]
    return (
      <div className="table-row" style={{ background }}>
        <div
          className="min-w-[1ch] box-content !opacity-80 pl-2 select-none table-cell border-l-2 "
          style={{ borderColor }}
        >
          {icon}
        </div>
        <div className="table-cell">
          <InnerLine merge={props} />
        </div>
      </div>
    )
  },
}
