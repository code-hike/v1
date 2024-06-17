import {
  RawCode,
  Pre,
  highlight,
  AnnotationHandler,
  InnerLine,
} from "codehike/code"
import Content from "./content.md"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Page() {
  return <Content components={{ Code }} />
}

type CodeComponent = (props: { codeblock: RawCode }) => Promise<JSX.Element>

const Code: CodeComponent = async ({ codeblock }) => {
  const highlighted = await highlight(codeblock, "github-dark")

  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-2xl">
      <ResizablePanel defaultSize={95} className="min-w-64 max-w-[42ch]">
        <Pre
          className="m-0 px-0 bg-zinc-950 w-full whitespace-pre-wrap"
          code={highlighted}
          handlers={[wordWrap, lineNumbers]}
        />
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="bg-transparent dark:bg-transparent"
      />
      <ResizablePanel defaultSize={5} />
    </ResizablePanelGroup>
  )
}

const wordWrap: AnnotationHandler = {
  name: "word-wrap",
  Line: (props) => (
    <InnerLine
      merge={props}
      className="px-2"
      style={{
        textIndent: `${-props.indentation}ch`,
        marginLeft: `${props.indentation}ch`,
      }}
    />
  ),
}

const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => (
    <div className="table-row">
      <span className="pr-2 w-[4ch] box-content !opacity-50 text-right select-none table-cell">
        {props.lineNumber}
      </span>
      <InnerLine merge={props} />
    </div>
  ),
}
