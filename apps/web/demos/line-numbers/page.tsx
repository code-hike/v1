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

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")

  return (
    <Pre
      className="m-0 px-1 bg-zinc-950/80"
      code={info}
      handlers={[lineNumbers]}
    />
  )
}

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 1
    return (
      <div className="table-row">
        <div
          style={{ minWidth: `${width}ch` }}
          className="!opacity-50 text-right select-none table-cell"
        >
          {props.lineNumber}
        </div>
        <div className="table-cell pl-3">
          <InnerLine merge={props} />
        </div>
      </div>
    )
  },
}
