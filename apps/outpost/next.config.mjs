import nextMDX from "@next/mdx"
import { remarkCodeHike } from "codehike/mdx"

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
    // recmaPlugins: [recma],
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
