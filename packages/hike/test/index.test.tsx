import { expect, test, describe } from "vitest"
import { transformAllHikes } from "../src/remark"
import { compile } from "@mdx-js/mdx"
import fs from "node:fs/promises"
import path from "node:path"
import * as prettier from "prettier"
import { getStepsFromChildren } from "../src/Hike"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

// test/data/*.0.mdx
const testNames = await getTestNames()

testNames.forEach((name) => {
  describe.sequential(`test ${name}`, () => {
    test(`compilation`, async () => {
      const mdx = await fs.readFile(`./test/data/${name}.0.mdx`, "utf-8")
      const mdxPath = path.resolve(`./test/data/${name}.0.mdx`)
      await testCompilation(name, mdx, mdxPath)
    })
    test(`static render`, async () => {
      const { default: MDXContent } = await import(`./data/${name}.6.out.jsx`)
      await testRender(MDXContent, name)
    })
  })
})

async function testRender(MDXContent: any, name: string) {
  const { children } = MDXContent().props
  const slots = getStepsFromChildren(children)
  expect(slots).toMatchFileSnapshot(`./data/${name}.7.slots.jsx`)

  const html = await prettier.format(renderToStaticMarkup(<MDXContent />), {
    parser: "html",
  })
  expect(html).toMatchFileSnapshot(`./data/${name}.8.static.html`)
}

async function testCompilation(name: string, mdx: string, mdxPath: string) {
  const result = await compile(
    {
      value: mdx,
      history: [mdxPath],
    },
    {
      jsx: true,
      // baseUrl: import.meta.url,
      remarkPlugins: [
        [logRemark, { name: name + ".2.remark" }],
        [hikeRemark, {}],
        [(n) => logRemark(n), { name: name + ".3.remark" }],
      ],
      rehypePlugins: [[(n) => logRemark(n), { name: name + ".4.rehype" }]],
      recmaPlugins: [[(n) => logRemark(n), { name: name + ".5.recma" }]],
    },
  )
  const out = await prettier.format(String(result), {
    semi: false,
    parser: "babel",
  })
  await expect(out).toMatchFileSnapshot(`./data/${name}.6.out.jsx`)
}

const hikeRemark = (config) => {
  return async (tree, file) => {
    tree = (await transformAllHikes(tree, config, file)) as any
    return tree as any
  }
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

async function getTestNames() {
  const allFileNames = await fs.readdir("./test/data")
  const mdxFileNames = allFileNames.filter((f) => f.endsWith(".0.mdx"))
  return mdxFileNames.map((f) => f.replace(".0.mdx", ""))
}
