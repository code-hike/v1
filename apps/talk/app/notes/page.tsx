import { Selection, Selectable, SelectionProvider } from "codehike/utils"

import React from "react"
import { getAllSlides, getSectionNames } from "@/lib/source"

export default async function Train({
  params,
}: {
  params: { sections: string[] }
}) {
  const [section] = params.sections || []
  const slides = await getAllSlides(section)
  return <Slides slides={slides} />
}

// export async function generateStaticParams() {
//   const names = await getSectionNames()
//   return names.map((name) => ({ params: { sections: [name] } }))
// }

function Slides({
  slides,
}: {
  slides: {
    children: React.ReactNode
    notes: React.ReactNode
  }[]
}) {
  return (
    <div className="w-screen flex flex-col justify-center items-center mt-12 max-w-full">
      {slides.map((slide, i) => (
        <>
          <div>{slide.notes}</div>
          <hr />
          <br />
        </>
      ))}
    </div>
  )
}
