import { getAllSlides } from "@/lib/source"

export default async function Home() {
  const slides = await getAllSlides()
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
    <main className="flex flex-wrap gap-6 justify-center mt-8">
      {slides.map(({ children }) => {
        return (
          <div style={{ height: 552 / 2, width: 980 / 2 }}>
            <div
              style={{ height: 552, width: 980 }}
              className="bg-zinc-100 shadow relative overflow-hidden scale-50 origin-top-left"
            >
              {children}
            </div>
          </div>
        )
      })}
    </main>
  )
}
