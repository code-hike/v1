import { CodeBlock, CodeContent } from "codehike"
import { CodeSwitcher } from "./code-switcher"
import theme from "../../theme.mjs"

export async function Code({ codeblocks }: { codeblocks: CodeBlock[] }) {
  const groups = groupByMeta(codeblocks)
  return Object.keys(groups).map((meta, i) => (
    <CodeGroup key={i} codeblocks={groups[meta]} />
  ))
}

function CodeGroup({ codeblocks }: { codeblocks: CodeBlock[] }) {
  const options = codeblocks.map((codeblock) => ({
    meta: codeblock.meta,
    lang: codeblock.lang,
    children: (
      <CodeContent
        codeblock={codeblock}
        config={{ theme }}
        className="px-4 py-2 !bg-zinc-800/50 leading-normal overflow-auto w-full"
      />
    ),
  }))

  return (
    <div
      data-ch-theme={theme.name}
      className="overflow-hidden rounded ring-1 ring-zinc-300/20 mb-4"
    >
      <CodeSwitcher options={options} />
    </div>
  )
}

function groupByMeta(codeblocks: CodeBlock[]) {
  const groups: Record<string, CodeBlock[]> = {}
  for (const codeblock of codeblocks) {
    const meta = codeblock.meta || ""
    if (!groups[meta]) groups[meta] = []
    groups[meta].push(codeblock)
  }
  return groups
}
