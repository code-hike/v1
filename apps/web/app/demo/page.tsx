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
import { mark } from "@/components/annotations/mark"
import { lineNumbers } from "@/components/annotations/line-numbers"
import { callout } from "@/components/annotations/callout"
import { line } from "@/components/annotations/line"
import { collapse } from "@/components/annotations/collapse"
import theme from "../../theme.mjs"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, theme)
  return (
    <Pre
      code={highlighted}
      className="rounded-md overflow-hidden shadow-sm m-4 py-2 bg-editor-background  selection:bg-editor-selectionBackground border border-zinc-500/40"
      handlers={[
        //
        mark,
        lineNumbers,
        callout,
        ...collapse,
        line,
      ]}
    />
  )
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
