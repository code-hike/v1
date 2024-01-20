import createNextDocsMDX from "next-docs-mdx/config"

const withMDX = createNextDocsMDX({
  mdxOptions: {},
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
