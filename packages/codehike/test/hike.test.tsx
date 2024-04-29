import { expect, test, describe } from "vitest"
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from "../src/remark"
import { compile } from "@mdx-js/mdx"
import fs from "node:fs/promises"
import path from "node:path"
import * as prettier from "prettier"

const dataPath = "./test/data/hike"
const testNames = await getTestNames(dataPath)
const JSX = false

testNames.forEach((name) => {
  describe.sequential(`test ${name}`, () => {
    test(`compilation`, async () => {
      const mdx = await fs.readFile(`${dataPath}/${name}.0.mdx`, "utf-8")
      const mdxPath = path.resolve(`${dataPath}/${name}.0.mdx`)
      await testCompilation(name, mdx, mdxPath)
    })
  })
})

const chConfig: CodeHikeConfig = {
  components: {
    code: "MyCode",
  },
  // syntaxHighlighting: {
  //   theme: "github-dark",
  // },
}

async function testCompilation(name: string, mdx: string, mdxPath: string) {
  const file = { value: mdx, history: [mdxPath] }

  // all steps jsx true
  await expect(
    await compileAndFormat(file, {
      jsx: true,
      remarkPlugins: [
        [logRemark, { name: name + ".2.remark" }],
        [remarkCodeHike, chConfig],
        [(n) => logRemark(n), { name: name + ".3.remark" }],
      ],
      rehypePlugins: [[(n) => logRemark(n), { name: name + ".4.rehype" }]],
      recmaPlugins: [
        [(n) => logRemark(n), { name: name + ".5.jsx-recma" }],
        [recmaCodeHike, chConfig],
        [(n) => logRemark(n), { name: name + ".6.jsx-recma" }],
      ],
    }),
  ).toMatchFileSnapshot(`./data/hike/${name}.7.out.jsx`)

  // recma steps jsx false
  await expect(
    await compileAndFormat(file, {
      jsx: false,
      remarkPlugins: [[remarkCodeHike, chConfig]],
      recmaPlugins: [
        [(n) => logRemark(n), { name: name + ".5.js-recma" }],
        [recmaCodeHike, chConfig],
        [(n) => logRemark(n), { name: name + ".6.js-recma" }],
      ],
    }),
  ).toMatchFileSnapshot(`./data/hike/${name}.7.out.js`)

  // intermediate result jsx true
  await expect(
    await compileAndFormat(file, {
      jsx: true,
      remarkPlugins: [[remarkCodeHike, chConfig]],
    }),
  ).toMatchFileSnapshot(`./data/hike/${name}.4.out.jsx`)

  // intermediate result jsx false
  await expect(
    await compileAndFormat(file, {
      jsx: false,
      remarkPlugins: [[remarkCodeHike, chConfig]],
    }),
  ).toMatchFileSnapshot(`./data/hike/${name}.4.out.js`)
}

async function compileAndFormat(file, options) {
  const r = await compile(file, options)
  return await prettier.format(String(r), {
    semi: false,
    parser: "babel",
  })
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
