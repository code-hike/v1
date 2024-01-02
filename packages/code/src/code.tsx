import { MDXComponents } from "mdx/types.js"
import { AnyToken, CodeBlock, isGroup, isWhitespace } from "./types.js"
import React from "react"
import { CodeContent } from "./code-content.js"
import { Theme } from "@code-hike/lighter"

export { CodeContent }

export async function Code({
  codeblocks,
  config,
  components,
  as,
  ...rest
}: {
  config: { theme: Theme }
  codeblocks: CodeBlock[]
  components: MDXComponents
  as?: any
}) {
  if (as) {
    return React.createElement(as, {
      codeblocks,
      config,
      components,
      ...rest,
    })
  }

  return (
    <div>
      {codeblocks.map((codeblock, i) => (
        // @ts-expect-error
        <SingleCode
          key={i}
          codeblock={codeblock}
          config={config}
          components={components}
        />
      ))}
    </div>
  )
}

async function SingleCode({
  codeblock,
  config,
  components,
}: {
  codeblock: CodeBlock
  config: any
  components: MDXComponents
}) {
  const { lang, meta, value, annotations } = codeblock
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "4px",
        margin: 8,
        padding: 8,
      }}
      data-ch-theme={config.themeName}
    >
      <div>{meta}</div>
      {/* @ts-expect-error */}
      <CodeContent
        codeblock={codeblock}
        config={config}
        components={components}
        data-ch-lang={lang}
      />
    </div>
  )
}
