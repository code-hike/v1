export function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 rounded bg-[url(/dark-grid.svg)] pl-2">
      {children}
    </div>
  )
}
