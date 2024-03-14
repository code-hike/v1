import { expect, test, describe } from "vitest"
import * as prettier from "prettier"
import fs from "node:fs/promises"
import { fromMarkdown } from "mdast-util-from-markdown"
import { Code } from "mdast"
import React from "react"
import { renderToReadableStream } from "react-dom/server.edge"
import { CodeContent } from "../src/code/code-content"
import { tokenize } from "../src/code/code-to-tokens"
import { splitAnnotationsAndCode } from "../src/code/extract-annotations"

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

  const html = await prettier.format(
    await rscToHTML(
      // @ts-ignore
      <CodeContent
        codeblock={{
          lang: lang!,
          meta: meta!,
          value: code,
          annotations,
        }}
        config={{ theme: "github-dark" }}
        components={{
          Mark,
        }}
      />,
    ),
    { parser: "html" },
  )
  expect(html).toMatchFileSnapshot(`./data/code/${name}.3.static.html`)
}

async function rscToHTML(children: any) {
  const stream = await renderToReadableStream(children)
  await stream.allReady
  const response = new Response(stream)
  const html = await response.text()
  return html
}

async function getTestNames(dirname: string) {
  const allFileNames = await fs.readdir(dirname)
  const mdxFileNames = allFileNames.filter((f) => f.endsWith(".0.mdx"))
  return mdxFileNames.map((f) => f.replace(".0.mdx", ""))
}

function Mark({ children }) {
  return <mark>{children}</mark>
}
