import { Block, ImageBlock, parseRoot } from "codehike/blocks"

import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger as DialogTriggerPrimitive,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Schema = Block.extend({
  speakers: z.array(
    Block.extend({
      pic: ImageBlock,
      time: z.string(),
      talk: Block,
    }),
    // .transform(({title, ...rest}) => ({
    //   ...rest,
    //   name: title,
    // })
  ),
})

import Content from "./speakers.mdx"
const { speakers } = parseRoot(Content, Schema)

export function Conf() {
  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-center text-5xl py-4">JSHeroes 2024</h1>
      <h2 className="text-2xl py-4">Speakers</h2>
      <section className="flex flex-wrap gap-4 pb-4 justify-between">
        {speakers.map((speaker) => (
          <DialogTrigger className="w-32" speaker={speaker}>
            <img
              src={speaker.pic.url}
              alt={speaker.pic.alt}
              className="rounded-full h-32"
            />
            <h3 className="text-center pt-2">{speaker.title}</h3>
          </DialogTrigger>
        ))}
      </section>
      <section className="pb-4">
        <h2 className="text-2xl py-4">Agenda</h2>
        {speakers.map((speaker) => (
          <DialogTrigger
            className="flex items-center gap-4 py-2 text-left w-full"
            speaker={speaker}
          >
            <span className="w-12 font-mono">{speaker.time}</span>
            <img
              src={speaker.pic.url}
              alt={speaker.pic.alt}
              className="grayscale h-20 w-20 rounded-full"
            />
            <span className="flex-1">
              <h3 className="font-bold">{speaker.title}</h3>
              {speaker.talk.title}
            </span>
          </DialogTrigger>
        ))}
      </section>
    </main>
  )
}

type Speaker = (typeof speakers)[number]

function DialogTrigger({
  children,
  className,
  speaker,
}: {
  children: React.ReactNode
  className?: string
  speaker: Speaker
}) {
  return (
    <Dialog>
      <DialogTriggerPrimitive
        className={cn(
          "hover:ring ring-offset-4 ring-offset-zinc-800 rounded transition-all",
          className,
        )}
      >
        {children}
      </DialogTriggerPrimitive>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{speaker.title}</DialogTitle>
          <DialogDescription className="flex pt-6 gap-6 text-zinc-900">
            <img src={speaker.pic.url} alt={speaker.pic.alt} className="h-44" />
            <div>
              <p>{speaker.children}</p>
              <h3 className="text-lg font-bold pt-4 pb-2">
                Talk: {speaker.talk.title}
              </h3>
              <p>{speaker.talk.children}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
