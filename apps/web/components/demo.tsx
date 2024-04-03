import fs from "fs"
import path from "path"
import { Pre, highlight } from "codehike/code"
import { CopyButton } from "./copy-button"

export async function Demo({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  const value = await fs.promises.readFile(
    path.join(process.cwd(), "demos", name, "content.md"),
    "utf-8",
  )
  const highlighted = await highlight(
    {
      value,
      lang: "mdx",
      meta: "",
    },
    "github-dark",
    {
      annotationPrefix: "!!",
    },
  )

  const usage = (
    <div className="border border-zinc-700 rounded overflow-hidden min-h-full">
      <div className="border-b border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-300 text-sm flex">
        content.md
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre className="m-0 bg-transparent" code={highlighted} />
    </div>
  )

  const { default: Page } = await import(`@/demos/${name}/page`)

  const preview = (
    <div className="min-w-0 rounded flex-1 bg-blue-500/40 bg-[url(/dark-grid.svg)] p-3 flex flex-col overflow-hidden ">
      <Page />
      {children && (
        <div className="mt-auto text-center text-white font-light">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex gap-2 items-stretch">
      <div className="min-w-0 flex-1">{usage}</div>
      {preview}
    </div>
  )
}
function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded flex-1 bg-blue-500/40 bg-[url(/dark-grid.svg)] p-3 flex flex-col ">
      {children}
      <div className="mt-auto text-center text-white">Foo bar</div>
    </div>
  )
}
