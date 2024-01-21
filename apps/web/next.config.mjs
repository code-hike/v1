import createNextDocsMDX from "next-docs-mdx/config"
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"

const withMDX = createNextDocsMDX({
  mdxOptions: {
    remarkPlugins: [remarkCodeHike],
    recmaPlugins: [recmaCodeHike],
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
