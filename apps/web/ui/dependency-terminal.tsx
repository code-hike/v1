import { CodeBlock, CodeContent } from "codehike"
import { CopyButton } from "./copy-button"
import { TerminalSquare } from "lucide-react"

export function DependencyTerminal({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
      <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
        <TerminalSquare size={20} className="-m-2 mr-2 text-zinc-100/60" />
        <span>Terminal</span>
        <CopyButton className="ml-auto" text={codeblock.value} />
      </div>
      <CodeContent
        codeblock={{
          ...codeblock,
          value: `npm install ${codeblock.value}`,
        }}
        config={{ theme: "github-dark", annotationPrefix: "!" }}
        className="max-h-96 m-0"
      />
    </div>
  )
}
