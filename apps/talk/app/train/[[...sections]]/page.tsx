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
    <SelectionProvider className="w-screen flex flex-col justify-center items-center mt-12 max-w-full">
      <main
        style={{ height: 552, width: 980 }}
        className="bg-zinc-100 shadow relative overflow-hidden"
      >
        <Selection
          from={slides.map(({ children }) => (
            <section className="flex justify-center items-center w-full h-full bg-zinc-800 overflow-hidden text-white">
              {children}
            </section>
          ))}
        />
      </main>
      <Nav blocks={slides} />
      <div className="max-w-xl">
        <Selection
          from={slides.map(({ notes }) => (
            <section className="prose">{notes}</section>
          ))}
        />
      </div>
    </SelectionProvider>
  )
}
