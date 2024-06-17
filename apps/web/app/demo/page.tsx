import Demo from "@/demos/scrollycoding/page"
import Content from "./content.md"
import {
  AnnotationHandler,
  Pre,
  RawCode,
  InnerPre,
  highlight,
  InnerLine,
  InnerToken,
} from "codehike/code"
import { SmoothPre } from "./client"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      className="border border-gray-200 m-4 w-56"
      handlers={[lineNumbers]}
    />
  )
}

const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const { children } = props
    return (
      <InnerLine merge={props} className="table-row">
        <span className="pr-2 w-[4ch] box-content !opacity-50 text-right select-none table-cell">
          {props.lineNumber}
        </span>
        <span className="table-cell">{children}</span>
      </InnerLine>
    )
  },
}

const wordWrap: AnnotationHandler = {
  name: "word-wrap",
  Pre: (props) => <InnerPre merge={props} className="whitespace-pre-wrap" />,
  Line: (props) => {
    return (
      <InnerLine
        merge={props}
        style={{
          textIndent: `${-props.indentation}ch`,
          marginLeft: `${props.indentation}ch`,
        }}
      />
    )
  },
}

const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  PreWithRef: SmoothPre,
  Token: (props) => (
    <InnerToken merge={props} style={{ display: "inline-block" }} />
  ),
}
