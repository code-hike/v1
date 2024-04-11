import createNextDocsMDX from "next-docs-mdx/config"
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: {
    code: "Code",
    image: "Image",
    table: "Table",
  },
  ignoreCodeblock: (codeblock) => codeblock.lang === "mermaid",
  syntaxHighlight: {
    theme: "github-dark",
  },
}

const withMDX = createNextDocsMDX({
  mdxOptions: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default withMDX(config)
