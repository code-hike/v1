import nextMDX from "@next/mdx"
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import { toJs, jsx } from "estree-util-to-js"

import theme from "./theme.mjs"
// const theme = "material-default"

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // remark,
      [remarkCodeHike, { theme }],
      // remark,
    ],
    rehypePlugins: [],
    recmaPlugins: [
      recmaCodeHike,
      // logRecma
    ],
    jsx: true,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["lucide-react"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

export default withMDX(nextConfig)

function logRecma() {
  return (tree, file) => {
    const output = toJs(tree, { handlers: jsx })
    console.log(`\n~~~${file?.history.join(">")}`)
    console.log(output.value.trim())
    console.log(`~~~\n`)
  }
}
