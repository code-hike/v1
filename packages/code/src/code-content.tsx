import { MDXComponents } from "mdx/types.js"
import { tokenize } from "./code-to-tokens.js"
import { AnyToken, CodeBlock, isGroup, isWhitespace } from "./types.js"
import React from "react"
import { CodeClient } from "./code-client.js"

let annotationWarning = new Set()

export async function CodeContent({
  codeblock,
  components,
  config,
  ...props
}: {
  codeblock: CodeBlock
  config: any
  components: MDXComponents
}) {
  const { lang, meta, value, annotations = [] } = codeblock
  const tokens = await tokenize(value, lang || "txt", annotations, {
    theme: config.theme,
    ...config,
  })
  return (
    <CodeClient {...props}>
      <TokensComponent tokens={tokens} components={components} />
    </CodeClient>
  )
}

function TokensComponent({
  tokens,
  components,
}: {
  tokens: AnyToken[]
  components: MDXComponents
}) {
  return tokens.map((token, i) => (
    <TokenComponent token={token} key={i} components={components} />
  ))
}

function TokenComponent({
  token,
  components,
}: {
  token: AnyToken
  components: MDXComponents
}) {
  if (isGroup(token)) {
    const [[name, query, { inline } = { inline: false }], tokens] = token
    if (components[name]) {
      return React.createElement(components[name] as any, {
        query,
        inline,
        children: tokens.map((token, i) => (
          <TokenComponent token={token} key={i} components={components} />
        )),
      })
    }

    if (name === "class") {
      return (
        <span className={query}>
          {tokens.map((token, i) => (
            <TokenComponent token={token} key={i} components={components} />
          ))}
        </span>
      )
    }

    if (!annotationWarning.has(name)) {
      annotationWarning.add(name)
      console.warn("Missing annotation component", name)
    }

    return (
      <span className={name}>
        {tokens.map((token, i) => (
          <TokenComponent token={token} key={i} components={components} />
        ))}
      </span>
    )
  }

  // if is whitespaceToken

  if (isWhitespace(token)) {
    return token
  }

  const [content, color, style = {}] = token
  style.color = color

  return <span style={{ ...style, display: "inline-block" }}>{content}</span>
}
