import { tokenize } from "codehike"
import React from "react"

export async function Code({ codeblock, className, theme = "min-dark" }) {
  const tokens = await tokenize(codeblock.value, codeblock.lang, theme, {
    parentPath: codeblock.parentPath,
    lines: true,
  })

  return (
    <pre className={className}>
      {tokens.map((token, i) => (
        <Token token={token} key={i} />
      ))}
    </pre>
  )
}

const annotationComponents = {
  Mark,
  Line,
}

function Mark({ query, inline, children }) {
  return (
    <div className={"bg-zinc-700 border-l-2 border-l-blue-300"}>{children}</div>
  )
}

function Line({ children, query }) {
  return (
    <div data-line="true" className="px-2">
      <span className="pl-1 pr-4 inline-block w-[2ch] box-content opacity-50 text-right select-none">
        {query}
      </span>
      {children}
    </div>
  )
}

function Token({ token }) {
  if (typeof token === "string") {
    return token
  }

  if (isGroup(token)) {
    const [[name, query, { inline } = { inline: false }], tokens] = token

    if (annotationComponents[name]) {
      return React.createElement(annotationComponents[name], {
        query,
        inline,
        children: tokens.map((token, i) => <Token token={token} key={i} />),
      })
    }

    if (name == "class") {
      return (
        <div className={query}>
          {tokens.map((token, i) => (
            <Token token={token} key={i} />
          ))}
        </div>
      )
    }

    console.warn("Missing annotation component", name)
    return (
      <span className={name}>
        {tokens.map((token, i) => (
          <Token token={token} key={i} />
        ))}
      </span>
    )
  }

  const [content, color, style = {}] = token
  style.color = color

  return <span style={style}>{content}</span>
}

function isGroup(token) {
  return Array.isArray(token) && Array.isArray(token[0])
}
