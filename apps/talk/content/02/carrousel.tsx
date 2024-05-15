export function Carrousel() {
  return (
    <div className="flex gap-[12px] h-full items-center px-10 animate-marquee ">
      <img src="/csharp.png" className="w-[332px] rounded" />

      <img src="/elixir.png" className="w-[332px] rounded" />
      <img src="/google.png" className="w-[332px] rounded" />
      <img src="/python.png" className="w-[332px] rounded" />
      <img src="/csharp.png" className="w-[332px] rounded" />

      <img src="/elixir.png" className="w-[332px] rounded" />
      <img src="/google.png" className="w-[332px] rounded" />
      <img src="/python.png" className="w-[332px] rounded" />
      <img src="/csharp.png" className="w-[332px] rounded" />
      <img src="/elixir.png" className="w-[332px] rounded" />
    </div>
  )
}

export function LittleBoxes() {
  return (
    <>
      <img src="/little-boxes.png" className="absolute inset-0 w-full" />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
    </>
  )
}
