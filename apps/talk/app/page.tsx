import MDX from "./content.mdx"
import Image from "next/image"
import { parseRoot, Block, HighlightedCodeBlock } from "codehike/blocks"
import { z } from "zod"
import { Pre } from "codehike/code"
import { Selection, Selectable, SelectionProvider } from "codehike/utils"
import Nav from "./nav"

import { slides } from "./sections/ideal.slides"

export default function Home() {
  return (
    <SelectionProvider className="h-screen w-screen flex flex-col justify-center items-center">
      <main
        style={{ height: 552, width: 980 }}
        className="bg-zinc-100 shadow relative overflow-hidden"
      >
        <Selection
          from={slides.map((slide) => (
            <section className="flex justify-center items-center w-full h-full">
              {slide}
            </section>
          ))}
        />
      </main>
      <Nav blocks={slides} />
    </SelectionProvider>
  )
}
