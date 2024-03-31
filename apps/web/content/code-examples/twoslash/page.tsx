import {
  BlockAnnotationComponent,
  CodeData,
  Pre,
  InlineAnnotation,
  InlineAnnotationComponent,
  LineAnnotationComponent,
  highlight,
} from "codehike/code"
import Content from "./content.md"
import { createTwoslasher } from "twoslash"

export default function Page() {
  return <Content components={{ Code }} />
}

const twoslasher = createTwoslasher({
  fsMap: new Map(),

  compilerOptions: {
    lib: ["dom"],
    types: ["react"],
  },
})

async function Code({
  codeblock,
}: {
  codeblock: CodeData
}) {
  const value = codeblock.value
  const result = twoslasher(
    // TODO fix https://github.com/twoslashes/twoslash/issues/30
    value.replace(/\r/g, ""),
    codeblock.lang,
  )

  const { hovers, code, queries, completions, errors } =
    result

  // console.log(result)

  const data = { ...codeblock, value: code }
  const info = await highlight(data, "github-dark")

  hovers.forEach(({ text, line, character, length }) => {
    info.annotations.push({
      name: "Hover",
      query: text,
      lineNumber: line + 1,
      fromColumn: character + 1,
      toColumn: character + length,
    })
  })

  queries.forEach(({ text, line, character, length }) => {
    info.annotations.push({
      name: "Query",
      query: text,
      fromLineNumber: line + 1,
      toLineNumber: line + 1,
      data: { character },
    })
  })

  // completions.forEach(
  //   ({ line, character, completions }) => {
  //     const names = completions.map((c) => c.name)
  //     console.log(names)
  //   },
  // )

  errors.forEach(({ text, line, character, length }) => {
    info.annotations.push({
      name: "Query",
      query: text,
      fromLineNumber: line + 1,
      toLineNumber: line + 1,
      data: { character, className: "text-red-500" },
    })
  })

  return (
    <Pre
      className="m-0"
      info={info}
      components={{ InlineHover: Hover, BlockQuery }}
    />
  )
}

const BlockQuery: BlockAnnotationComponent = ({
  annotation,
  children,
}) => {
  const { character, className } = annotation.data
  return (
    <>
      {children}
      <div
        style={{ minWidth: `${character + 4}ch` }}
        className={
          "w-fit border bg-zinc-800 border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces" +
          " " +
          className
        }
      >
        <div
          style={{ left: `${character + 1}ch` }}
          className="absolute border-l border-t border-current w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-800"
        />
        {annotation.query}
      </div>
    </>
  )
}

const Hover: InlineAnnotationComponent = ({
  children,
  annotation,
}) => {
  return (
    <span
      className="decoration-dotted underline"
      title={annotation.query}
    >
      {children}
    </span>
  )
}
