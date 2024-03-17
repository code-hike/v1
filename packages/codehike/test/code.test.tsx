import { expect, test, describe } from "vitest"
import * as prettier from "prettier"
import fs from "node:fs/promises"
import { fromMarkdown } from "mdast-util-from-markdown"
import { Code } from "mdast"
import React from "react"
import { renderToReadableStream } from "react-dom/server.edge"
import { CodeRender } from "../src/code/code-render"
import { tokenize } from "../src/code/code-to-tokens"
import { splitAnnotationsAndCode } from "../src/code/extract-annotations"
import { Annotation as NewAnnotation } from "../src/code/render/common"
import {
  AnnotationComponents,
  LineComponent,
  TokenComponent,
} from "../src/code/render/annotation-components"

const dataPath = "./test/data/code"
const testNames = await getTestNames(dataPath)

testNames.forEach((name) => {
  describe.sequential(`code - ${name}`, () => {
    test(`compilation`, async () => {
      const mdx = await fs.readFile(`${dataPath}/${name}.0.mdx`, "utf-8")
      const mdxPath = `${dataPath}/${name}.0.mdx`
      await testCompilation(name, mdx, mdxPath)
    })
  })
})

async function testCompilation(name: string, mdx: string, mdxPath: string) {
  const { children } = fromMarkdown(mdx)
  const codeblocks = children.filter((n) => n.type === "code")
  const codeblock = codeblocks[0]
  if (!codeblock) throw new Error("No codeblock found")

  const { lang, meta, value } = codeblock as Code

  const config = {
    theme: "github-dark",
    themeName: "github-dark",
    annotationPrefix: "!",
  } as const

  const { code, annotations } = await splitAnnotationsAndCode(
    value,
    lang!,
    config,
  )

  const tokens = await tokenize(code, lang!, [], config)
  expect(
    await prettier.format(JSON.stringify(tokens, null, 2), { parser: "json" }),
  ).toMatchFileSnapshot(`./data/code/${name}.1.tokens.json`)

  expect(
    await prettier.format(JSON.stringify(annotations, null, 2), {
      parser: "json",
    }),
  ).toMatchFileSnapshot(`./data/code/${name}.2.annotations.json`)

  const html = await rscToHTML(
    // @ts-ignore
    <CodeRender
      tokens={tokens as any}
      annotations={compatAnnotations(annotations)}
      components={{
        // Mark,
        Token,
        MarkLine,
        Line,
      }}
    />,
  )
  expect(html).toMatchFileSnapshot(`./data/code/${name}.3.static.html`)
}

function compatAnnotations(annotations: any[]): NewAnnotation[] {
  const newAnnotations: NewAnnotation[] = []
  for (const a of annotations) {
    const { name, query, ranges } = a
    for (const r of ranges) {
      if (r.lineNumber) {
        const { lineNumber, fromColumn, toColumn } = r
        newAnnotations.push([name, lineNumber, [fromColumn, toColumn], query])
      } else {
        const { fromLineNumber, toLineNumber } = r
        newAnnotations.push([name, [fromLineNumber, toLineNumber], query])
      }
    }
  }
  return newAnnotations
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

/** @type {TokenComponent} */
const Token: TokenComponent = ({ value, style }) => {
  return value
}

const MarkLine: LineComponent = ({ lineNumber, children, query }) => {
  return (
    <div className="bg-red-100">
      <span>{lineNumber}</span>
      <span className={query}>{children}</span>
    </div>
  )
}

const Line: LineComponent = ({ lineNumber, children, query }) => {
  return (
    <div>
      <span>{lineNumber}</span>
      <span>{children}</span>
    </div>
  )
}
