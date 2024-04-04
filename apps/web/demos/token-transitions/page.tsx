import { highlight } from "codehike/code"
import Content from "./content.mdx"
import { CodeSwitcher } from "./code"
import { parseContent } from "codehike"
import { Block, CodeBlock } from "codehike/schema"
import { z } from "zod"

export default async function Page() {
  const { code } = parseContent(
    Block.extend({ code: z.array(CodeBlock) }),
    Content,
  )

  const infos = await Promise.all(
    code.map((codeblock: any) => highlight(codeblock, "github-dark")),
  )
  return <CodeSwitcher infos={infos} />
}
