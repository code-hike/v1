import { CodeBlock, tokenize } from "codehike"

async function Tokens({
  codeblock,
  className,
}: {
  codeblock: CodeBlock
  className?: string
}) {
  const tokens = await tokenize(
    codeblock.value,
    codeblock.lang,
    "github-dark",
    {
      annotationPrefix: "!",
    } as any,
  )
  return (
    <pre
      className={className}
      style={{ color: "#C9D1D9AA", background: "transparent" }}
    >
      {tokens.map((token, i) => (
        <TokenComponent token={token} key={i} />
      ))}
    </pre>
  )
}

function TokenComponent({ token }: { token: any }) {
  if (isGroup(token)) {
    const [[name, query, { inline } = { inline: false }], tokens] = token
    const Annotation = annotations[name as keyof typeof annotations]
    return <Annotation token={token} />
  }

  if (isWhitespace(token)) {
    return token
  }

  const [content, color, style = {}] = token
  style.color = color
  return <span style={{ color }}>{content}</span>
}

function isGroup(token: any): boolean {
  return Array.isArray(token) && Array.isArray(token[0])
}
function isWhitespace(token: any): boolean {
  return typeof token === "string"
}

const annotations = {
  Color: ({ token }: any) => {
    const [[name, query, { inline } = { inline: false }], tokens] = token

    return (
      <span
        style={{ border: "1px solid", borderColor: query, borderRadius: 3 }}
      >
        {tokens.map((token: any, i: number) => (
          <TokenComponent token={token} key={i} />
        ))}
      </span>
    )
  },
  Note: ({ token }: any) => {
    const [[name, query, { inline } = { inline: false }], tokens] = token
    return (
      <>
        <div style={{ background: "black", color: "white" }}>{query}</div>
        <br />
      </>
    )
  },
}
