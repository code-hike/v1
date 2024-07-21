import * as prettier from "prettier"
import { compile, CompileOptions, run } from "@mdx-js/mdx"
import { Pluggable } from "unified"
import * as runtime from "react/jsx-runtime"
import { parse } from "../src/blocks"
import { renderToReadableStream } from "react-dom/server.edge"
import React from "react"
import { RawCode } from "../src/code/types"
import { highlight, Pre } from "../src/code"

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

export async function renderHTML(file: MDFile, options: CompileOptions) {
  const result = await compile(file, {
    ...options,
    outputFormat: "function-body",
  })
  const { default: Content } = await run(result, runtime as any)

  const html = await rscToHTML(
    // @ts-ignore
    <Content components={{ MyCode }} />,
  )
  return html
}

async function MyCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return <Pre code={highlighted} />
}

async function rscToHTML(children: any) {
  const stream = await renderToReadableStream(children)
  await stream.allReady
  const response = new Response(stream)
  const html = await response.text()

  return html.replace(new RegExp("<!-- -->", "g"), "")
}
