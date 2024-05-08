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
    <SelectionProvider className="h-screen w-screen flex flex-col justify-center items-center">
      <main
        style={{ height: 552, width: 980 }}
        className="bg-zinc-100 shadow relative overflow-hidden"
      >
        <Selection
          from={slides.map(({ children }) => (
            <section className="flex justify-center items-center w-full h-full">
              {children}
            </section>
          ))}
        />
      </main>
      <Nav blocks={slides} />
    </SelectionProvider>
  )
}
