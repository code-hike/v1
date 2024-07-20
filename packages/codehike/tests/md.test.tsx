import fs from "node:fs/promises"
import path from "node:path"
import { expect, test } from "vitest"
import fm from "front-matter"
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from "../src/mdx"

import { compileAST, compileJS, MDFile, parsedJS } from "./utils.ast"
import { errorToMd, getTestNames } from "./utils.suite"

const chConfig: CodeHikeConfig = {
  components: {
    code: "MyCode",
  },

  ignoreCode: (codeblock) => codeblock.lang === "mermaid",
}

const suitePath = "./tests/md-suite"
const testNames = await getTestNames(suitePath)

testNames.forEach(async (filename) => {
  test(filename, async () => {
    const mdPath = path.resolve(`${suitePath}/${filename}.0.mdx`)
    const md = await fs.readFile(mdPath, "utf-8")
    const { attributes, body } = fm<{ name?: string; snapshots?: string[] }>(md)
    const file = { value: body, history: [mdPath] }
    const { snapshots = [] } = attributes

    for (const step of snapshots) {
      try {
        const result = await getStepOutput(file, step)
        expect(result).toMatchFileSnapshot(sn(filename, step))
      } catch (e) {
        const md = errorToMd(e)
        await expect(md).toMatchFileSnapshot(sn(filename, "error"))
        return
      }
    }
  })
})

const js = ["before-recma-compiled-js", "compiled-js"]
const jsx = ["before-recma-compiled-jsx", "compiled-jsx", "parsed-jsx"]
function sn(filename: string, step: string) {
  const index = indexes[step]
  const extention =
    step === "error"
      ? "md"
      : js.includes(step)
        ? "js"
        : jsx.includes(step)
          ? "jsx"
          : "json"
  return `./md-suite/${filename}.${index}.${step}.${extention}`
}

const indexes = {
  error: 1,
  "before-remark": 2,
  "after-remark": 3,
  "after-rehype": 4,
  "before-recma-compiled-js": 5,
  "before-recma-compiled-jsx": 5,
  "before-recma-js": 5,
  "before-recma-jsx": 5,
  "after-recma-js": 6,
  "after-recma-jsx": 6,
  "compiled-js": 7,
  "compiled-jsx": 7,
  "parsed-jsx": 8,
  rendered: 9,
}

const STEPS = [
  "error",
  "before-remark",
  "after-remark",
  "after-rehype",
  "before-recma-compiled-js",
  "before-recma-compiled-jsx",
  "before-recma-js",
  "after-recma-js",
  "before-recma-jsx",
  "after-recma-jsx",
  "compiled-js",
  "compiled-jsx",
  "parsed-jsx",
  "rendered",
]

async function getStepOutput(file: MDFile, step: string) {
  switch (step) {
    case "before-remark":
      return await compileAST(file, (X) => ({
        remarkPlugins: [X],
      }))
    case "after-remark":
      return await compileAST(file, (X) => ({
        remarkPlugins: [[remarkCodeHike, chConfig], X],
      }))
    case "after-rehype":
      return await compileAST(file, (X) => ({
        remarkPlugins: [[remarkCodeHike, chConfig]],
        rehypePlugins: [X],
      }))
    case "before-recma-compiled-js":
      return await compileJS(file, {
        jsx: false,
        remarkPlugins: [[remarkCodeHike, chConfig]],
      })
    case "before-recma-compiled-jsx":
      return await compileJS(file, {
        jsx: true,
        remarkPlugins: [[remarkCodeHike, chConfig]],
      })
    case "before-recma-js":
      return await compileAST(file, (X) => ({
        jsx: false,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [X],
      }))
    case "after-recma-js":
      return await compileAST(file, (X) => ({
        jsx: false,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig], X],
      }))
    case "before-recma-jsx":
      return await compileAST(file, (X) => ({
        jsx: true,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [X],
      }))
    case "after-recma-jsx":
      return await compileAST(file, (X) => ({
        jsx: true,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig], X],
      }))
    case "compiled-js":
      return await compileJS(file, {
        jsx: false,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      })
    case "compiled-jsx":
      return await compileJS(file, {
        jsx: true,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      })
    case "parsed-jsx":
      return await parsedJS(file, {
        jsx: true,
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      })
    default:
      throw new Error(`Unknown snapshot: ${step}`)
  }
}
