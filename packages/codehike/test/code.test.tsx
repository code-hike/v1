import { expect, test, describe } from "vitest"
import * as prettier from "prettier"
import fs from "node:fs/promises"
import { fromMarkdown } from "mdast-util-from-markdown"
import { Code } from "mdast"
import React from "react"
import { renderToReadableStream } from "react-dom/server.edge"
import {
  highlight,
  Pre,
  LineComponent,
  TokenComponent,
  LineAnnotationComponent,
} from "../src/code/index"

const dataPath = "./test/data/code"
const testNames = await getTestNames(dataPath)

testNames.forEach((name) => {
  describe.sequential(`code - ${name}`, () => {
    test(`compilation`, async () => {
      const mdx = await fs.readFile(`${dataPath}/${name}.0.mdx`, "utf-8")
      const mdxPath = `${dataPath}/${name}.0.mdx`
      await testCompilation(name, mdx)
    })
  })
})

async function testCompilation(name: string, mdx: string) {
  const { children } = fromMarkdown(mdx)
  const codeblocks = children.filter((n) => n.type === "code")
  const codeblock = codeblocks[0]
  if (!codeblock) throw new Error("No codeblock found")

  const { lang, meta, value } = codeblock as Code

  const info = await highlight(
    {
      value,
      lang: lang || "txt",
      meta: meta || "",
    },
    "github-dark",
  )

  expect(
    await prettier.format(JSON.stringify(info.tokens, null, 2), {
      parser: "json",
    }),
  ).toMatchFileSnapshot(`./data/code/${name}.1.tokens.json`)

  expect(
    await prettier.format(JSON.stringify(info.annotations, null, 2), {
      parser: "json",
    }),
  ).toMatchFileSnapshot(`./data/code/${name}.2.annotations.json`)

  const html = await rscToHTML(
    // @ts-ignore
    <Pre
      code={info}
      components={{
        // Mark,
        Token,
        LineMark,
        Line,
      }}
    />,
  )
  expect(html).toMatchFileSnapshot(`./data/code/${name}.3.static.html`)
}

async function rscToHTML(children: any) {
  const stream = await renderToReadableStream(children)
  await stream.allReady
  const response = new Response(stream)
  const html = await response.text()

  return html.replace(new RegExp("<!-- -->", "g"), "")
}

async function getTestNames(dirname: string) {
  const allFileNames = await fs.readdir(dirname)
  const mdxFileNames = allFileNames.filter((f) => f.endsWith(".0.mdx"))
  return mdxFileNames.map((f) => f.replace(".0.mdx", ""))
}

function Mark({
  children,
  query,
}: {
  children: React.ReactNode
  query?: string
}) {
  return <mark className={query}>{children}</mark>
}

const Token: TokenComponent = ({ value, style }) => {
  return value
}

const LineMark: LineAnnotationComponent = ({
  lineNumber,
  children,
  annotation,
}) => {
  const { query } = annotation
  return (
    <div className="bg-red-100">
      <span>{lineNumber}</span>
      <span className={query}>{children}</span>
    </div>
  )
}

const Line: LineComponent = ({ lineNumber, children }) => {
  return (
    <div>
      <span>{lineNumber}</span>
      <span>{children}</span>
    </div>
  )
}
