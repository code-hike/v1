import { expect, test, describe } from "vitest"
import { codeTransform } from "../src/remark"
import { compile } from "@mdx-js/mdx"
import fs from "node:fs/promises"
import * as prettier from "prettier"
import React from "react"
import { renderToReadableStream } from "react-dom/server.edge"

// test/data/*.0.mdx
const testNames = await getTestNames()

testNames.forEach((name) => {
  describe.sequential(`test ${name}`, () => {
    test(`compilation`, async () => {
      const mdx = await fs.readFile(`./test/data/${name}.0.mdx`, "utf-8")
      const out = await testCompilation(name, mdx)
      await expect(out).toMatchFileSnapshot(`./data/${name}.6.out.jsx`)
    })
    test(`static render`, async () => {
      const { default: MDXContent } = await import(`./data/${name}.6.out.jsx`)
      const stream = await renderToReadableStream(
        <MDXContent components={{ Line }} />,
      )
      await stream.allReady
      const response = new Response(stream)

      const html = await prettier.format(await response.text(), {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore",
      })
      expect(html).toMatchFileSnapshot(`./data/${name}.7.static.html`)
    })
  })
})

async function Line({ children }: { children: React.ReactNode }) {
  return <div data-ch-line>{children}</div>
}

const ignoreProperties = ["start", "end", "position", "loc", "range"]
function logRemark({ name }: { name: string }) {
  return async function transformer(tree: any) {
    const out = await prettier.format(
      JSON.stringify(tree, (key, value) =>
        ignoreProperties.includes(key) ? undefined : value,
      ),
      {
        semi: false,
        parser: "json",
      },
    )
    expect(out).toMatchFileSnapshot(`./data/${name}.json`)
  }
}

const codeRemark = (config) => {
  return async (tree, file) => {
    tree = (await codeTransform(tree)) as any
    return tree as any
  }
}

async function testCompilation(name: string, mdx: string) {
  const compiled = await compile(mdx, {
    jsx: true,
    remarkPlugins: [
      [logRemark, { name: name + ".2.remark" }],
      [codeRemark, {}],
      [(n) => logRemark(n), { name: name + ".3.remark" }],
    ],
    rehypePlugins: [[(n) => logRemark(n), { name: name + ".4.rehype" }]],
    recmaPlugins: [[(n) => logRemark(n), { name: name + ".5.recma" }]],
    // providerImportSource: "../mdx-components",
  })
  return await prettier.format(String(compiled), {
    semi: false,
    parser: "babel",
  })
}

async function getTestNames() {
  const allFileNames = await fs.readdir("./test/data")
  const mdxFileNames = allFileNames.filter((f) => f.endsWith(".0.mdx"))
  return mdxFileNames.map((f) => f.replace(".0.mdx", ""))
}
