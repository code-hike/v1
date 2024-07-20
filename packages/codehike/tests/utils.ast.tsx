import * as prettier from "prettier"
import { compile, CompileOptions, run } from "@mdx-js/mdx"
import { Pluggable } from "unified"
import * as runtime from "react/jsx-runtime"
import { Block, parse } from "../src/blocks"

export type MDFile = {
  value: string
  history: string[]
}

const ignoreProperties = ["start", "end", "position", "loc", "range"]

export async function compileAST(
  file: MDFile,
  config: (X: Pluggable) => CompileOptions,
) {
  let ast: any

  const options = config(() => (tree) => {
    ast = tree
  })

  await compile(file, options)

  return await prettier.format(
    JSON.stringify(ast, (key, value) =>
      ignoreProperties.includes(key) ? undefined : value,
    ),
    {
      semi: false,
      parser: "json",
    },
  )
}

export async function compileJS(file: MDFile, options: CompileOptions) {
  const r = await compile(file, options)
  return await prettier.format(String(r), {
    semi: false,
    parser: "babel",
  })
}

export async function parsedJS(file: MDFile, options: CompileOptions) {
  const result = await compile(file, {
    ...options,
    outputFormat: "function-body",
    jsx: false,
  })
  const { default: Content } = await run(result, runtime as any)
  const block = parse(Content)
  return { block }
}
