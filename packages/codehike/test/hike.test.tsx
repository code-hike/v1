import { expect, test, describe } from "vitest"
import { remarkCodeHike, recmaCodeHike } from "../src/remark"
import { compile } from "@mdx-js/mdx"
import fs from "node:fs/promises"
import path from "node:path"
import * as prettier from "prettier"

const dataPath = "./test/data/code"
const testNames = await getTestNames(dataPath)

testNames.forEach((name) => {
  describe.sequential(`test ${name}`, () => {
    test(`compilation`, async () => {
      const mdx = await fs.readFile(`${dataPath}/${name}.0.mdx`, "utf-8")
      const mdxPath = path.resolve(`${dataPath}/${name}.0.mdx`)
      await testCompilation(name, mdx, mdxPath)
    })
  })
})

const chConfig = {
  components: {
    code: "MyCode",
  },
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
        [remarkCodeHike, chConfig],
        [(n) => logRemark(n), { name: name + ".3.remark" }],
      ],
      rehypePlugins: [[(n) => logRemark(n), { name: name + ".4.rehype" }]],
      recmaPlugins: [
        [(n) => logRemark(n), { name: name + ".5.recma" }],
        [recmaCodeHike, chConfig],
        [(n) => logRemark(n), { name: name + ".6.recma" }],
      ],
    },
  )
  const out = await prettier.format(String(result), {
    semi: false,
    parser: "babel",
  })
  await expect(out).toMatchFileSnapshot(`./data/hike/${name}.7.out.jsx`)

  const r = await compile(
    {
      value: mdx,
      history: [mdxPath],
    },
    {
      jsx: true,
      // baseUrl: import.meta.url,
      remarkPlugins: [[remarkCodeHike, chConfig]],
    },
  )
  const out2 = await prettier.format(String(r), {
    semi: false,
    parser: "babel",
  })
  await expect(out2).toMatchFileSnapshot(`./data/hike/${name}.4.out.jsx`)
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
    expect(out).toMatchFileSnapshot(`./data/hike/${name}.json`)
  }
}

async function getTestNames(dataPath: string) {
  const allFileNames = await fs.readdir(dataPath)
  const mdxFileNames = allFileNames.filter((f) => f.endsWith(".0.mdx"))
  return mdxFileNames.map((f) => f.replace(".0.mdx", ""))
}
