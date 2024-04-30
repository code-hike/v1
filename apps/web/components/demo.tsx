import fs from "fs"
import path from "path"
import { Pre, highlight } from "codehike/code"
import { CopyButton } from "./copy-button"
import { BasicCode } from "./code/basic-code"

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
    <BasicCode
      className="min-h-full flex flex-col my-0 max-h-full"
      codeblock={{
        value,
        lang: "mdx",
        meta: `${content} prefix`,
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
