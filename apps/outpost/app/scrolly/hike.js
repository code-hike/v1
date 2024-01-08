import { CodeContent } from "codehike"
import theme from "../../theme.mjs"
import { Slideshow } from "./hike.client"

const config = { theme, themeName: theme.name, annotationPrefix: "!" }

export function ExplainerLayout({ hike }) {
  const { steps } = hike.slots
  const slides = steps.map((step) => {
    const [left, right] = step.code
    return {
      left: <Code codeblock={left} title="MDX file" />,
      right: <Code codeblock={right} title="JSX output" />,
      children: step.children.filter((c) => c.type !== "placeholder"),
      className: step.query,
    }
  })
  return (
    <div data-ch-theme={config.themeName}>
      <Slideshow steps={slides} children={hike.children} />
    </div>
  )
}

function Code({ codeblock, title }) {
  return (
    <div className="rounded flex-1 min-w-0 bg-sky-950 overflow-hidden h-[500px]">
      <div className="text-sm text-center bg-sky-800 text-white py-1 px-4 font-mono">
        {title}
      </div>
      <CodeContent
        codeblock={addLineAnnotations(codeblock)}
        config={config}
        components={{
          Mark: ({ children, inline }) =>
            inline ? (
              <span data-focus>{children}</span>
            ) : (
              <div data-focus>{children}</div>
            ),
          Line: ({ children }) => <div data-line>{children}</div>,
        }}
        className="p-4 !bg-transparent"
      />
    </div>
  )
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
