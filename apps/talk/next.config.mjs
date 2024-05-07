import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import createMDX from "@next/mdx"

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: {
    code: "Code",
  },
  ignoreCode: (codeblock) => codeblock.lang === "mermaid",
  syntaxHighlighting: {
    theme: "github-dark",
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
}

export default withMDX(nextConfig)
