import { CodeContent } from "codehike"
import theme from "../../theme.mjs"

const config = { theme, themeName: theme.name, annotationPrefix: "!" }

export function Code({ codeblock, title }) {
  return (
    <div className="rounded flex-1 min-w-0 bg-zinc-950 overflow-hidden h-[500px] border border-zinc-500/50 shadow">
      <div className="text-sm text-center bg-zinc-700 text-white py-1 px-4 font-mono">
        {title}
      </div>
      <CodeContent
        codeblock={codeblock}
        config={config}
        components={{ Focus, Line, Mark }}
        className="py-4 !bg-transparent"
      />
    </div>
  )
}

function Focus({ children, inline }) {
  return inline ? (
    <span data-focus>{children}</span>
  ) : (
    <div data-focus>{children}</div>
  )
}

function Line({ children }) {
  return (
    <div data-line className="px-4">
      {children}
    </div>
  )
}

function Mark({ children }) {
  return <div data-mark>{children}</div>
}

function addLineAnnotations(codeblock) {
  const lines = codeblock.value.split("\n")
  const annotations = lines.map((line, index) => ({
    name: "Line",
    query: index + 1,
    ranges: [
      {
        fromLineNumber: index + 1,
        toLineNumber: index + 1,
      },
    ],
  }))
  return {
    ...codeblock,
    annotations: [...codeblock.annotations, ...annotations],
  }
}
