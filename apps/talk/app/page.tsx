import MDX from "./content.mdx"
import Image from "next/image"
import { parseRoot, Block } from "codehike/blocks"
import { z } from "zod"

const Schema = Block.extend({ blocks: z.array(Block) })
export default function Home() {
  const { blocks } = parseRoot(MDX, Schema)
  return (
    <main>
      {blocks.map((block, i) => (
        <section
          key={i}
          className="border border-red-200 flex w-screen h-screen justify-center items-center max-w-full"
        >
          <div>{block.children}</div>
        </section>
      ))}
    </main>
  )
}
