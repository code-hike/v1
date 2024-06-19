import fs from "fs"
import path from "path"
import { Code } from "./code"

export async function Demo({
  name,
  children,
  maxHeight,
  content = "content.md",
}: {
  name: string
  content?: string
  children: React.ReactNode
  maxHeight?: number
}) {
  const value = await fs.promises.readFile(
    path.join(process.cwd(), "demos", name, content),
    "utf-8",
  )

  const usage = (
    <Code
      className="min-h-full flex flex-col my-0 max-h-full"
      codeblock={{
        value,
        lang: "mdx",
        meta: `${content} -pwc`,
      }}
    />
  )

  const { default: Page } = await import(`@/demos/${name}/page`)

  const preview = (
    <div className="min-w-0 rounded flex-1 bg-blue-900/80 bg-[url(/dark-grid.svg)] p-3 flex flex-col overflow-hidden prose-invert">
      <Page />
      {children && (
        <div className="mt-auto text-center text-white font-light pt-2">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex gap-2 items-stretch" style={{ maxHeight }}>
      <div className="min-w-0 flex-1 max-h-full">{usage}</div>
      {preview}
    </div>
  )
}
