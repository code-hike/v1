import { Selection, Selectable, SelectionProvider } from "codehike/utils"
import Nav from "./nav"
import React from "react"
import { getAllSlides } from "@/lib/source"

export default async function Train({
  params,
}: {
  params: { sections: string[] }
}) {
  const [section] = params.sections || []
  const slides = await getAllSlides(section)
  return <Slides slides={slides} />
}

function Slides({
  slides,
}: {
  slides: {
    children: React.ReactNode
    notes: React.ReactNode
  }[]
}) {
  return (
    <SelectionProvider className="w-screen h-screen flex flex-col justify-center items-center max-w-full">
      <div
        className="h-60 overflow-hidden"
        style={{ maxWidth: 412, width: "100vw" }}
      >
        <main
          style={{ height: 552, width: 980, scale: 412 / 980 }}
          className="bg-zinc-100 shadow relative overflow-hidden origin-top-left"
        >
          <Selection
            from={slides.map(({ children }) => (
              <section className="flex justify-center items-center w-full h-full bg-zinc-800 overflow-hidden text-white">
                {children}
              </section>
            ))}
          />
        </main>
      </div>
      <div className="max-w-xl flex-1 overflow-auto w-full p-2">
        <Selection
          from={slides.map(({ notes }) => (
            <section className="prose">{notes}</section>
          ))}
        />
      </div>
      <Nav blocks={slides} />
    </SelectionProvider>
  )
}
