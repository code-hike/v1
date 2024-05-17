import { Block, ImageBlock, parseRoot } from "codehike/blocks"
import Content from "./conf-data.mdx"
import { z } from "zod"

const Schema = Block.extend({
  speakers: z.array(
    Block.extend({
      pic: ImageBlock,
      time: z.string(),
      talk: Block,
    }),
  ),
})

export function Conf() {
  const { speakers } = parseRoot(Content, Schema)
  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-center text-5xl py-4">JSHeroes 2024</h1>
      <h2 className="text-2xl py-4">Speakers</h2>
      <section className="flex flex-wrap gap-4 pb-4 justify-between">
        {speakers.map(({ pic, title }) => (
          <div className="w-32">
            <img src={pic.url} alt={pic.alt} className="rounded-full h-32" />
            <h3 className="text-center pt-2">{title}</h3>
          </div>
        ))}
      </section>
      <section className="pb-4">
        <h2 className="text-2xl py-4">Agenda</h2>
        {speakers.map(({ pic, title, time, talk }) => (
          <div className="flex items-center gap-4 pb-4">
            <span className="w-12 font-mono">{time}</span>
            <img
              src={pic.url}
              alt={pic.alt}
              className="grayscale h-20 w-20 rounded-full"
            />
            <span className="flex-1">
              <h3 className="font-bold">{title}</h3>
              {talk.title}
            </span>
          </div>
        ))}
      </section>
    </main>
  )
}
