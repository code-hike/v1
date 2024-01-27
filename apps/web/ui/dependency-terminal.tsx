import { CodeBlock, CodeContent } from "codehike"
import { CopyButton } from "./copy-button"
import { TerminalSquare } from "lucide-react"
import { TabsContent, TabsList, TabsToggle } from "./tabs-toggle"

export function DependencyTerminal({ codeblock }: { codeblock: CodeBlock }) {
  const options = ["npm install", "yarn add", "pnpm install"].map(
    (command) => ({
      name: command.split(" ")[0],
      content: (
        <CodeContent
          codeblock={{
            ...codeblock,
            lang: "bash",
            value: `${command} ${codeblock.value}`,
          }}
          config={{ theme: "github-dark", annotationPrefix: "!" }}
          className="max-h-96 m-0"
        />
      ),
    }),
  )

  return (
    <TabsToggle
      className="border border-zinc-300/20 rounded mb-8 bg-zinc-900 overflow-hidden"
      options={options}
    >
      <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
        <TerminalSquare size={20} className="-m-2 mr-2 text-zinc-100/60" />
        <span>Terminal</span>

        <TabsList />
        <CopyButton text={codeblock.value} />
      </div>

      <TabsContent />
    </TabsToggle>
  )
}
