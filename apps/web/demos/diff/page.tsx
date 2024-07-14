import {
  RawCode,
  Pre,
  highlight,
  AnnotationHandler,
  InnerLine,
} from "codehike/code"
import Content from "./content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

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
        <div className="table-cell px-2">
          <InnerLine merge={props} />
        </div>
      </div>
    )
  },
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      className="m-0 px-0 bg-zinc-950"
      code={highlighted}
      handlers={[diff]}
    />
  )
}
