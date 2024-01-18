import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"

import react from "@astrojs/react"
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkCodeHike],
      recmaPlugins: [recmaCodeHike, recma],
      jsx: false,
    }),
    react({
      experimentalReactChildren: false,
    }),
  ],
})

import { toJs, jsx } from "estree-util-to-js"
function recma() {
  return (tree, file) => {
    const output = toJs(tree, { handlers: jsx })
    console.log(`\n~~~${file?.history.join(">")}`)
    console.log(output.value.trim())
    console.log(`~~~\n`)
  }
}
