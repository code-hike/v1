import Content from "./content.md"
import { Block, CodeBlock, parseRoot } from "codehike/blocks"
import { AnnotationHandler, Pre, RawCode, highlight } from "codehike/code"
import { Selection, Selectable, SelectionProvider } from "codehike/utils"
import { tokenTransitions } from "@/components/annotations/token-transitions"
import { forwardRef } from "react"

const Schema = Block.extend({
  code: CodeBlock,
})

export default function Page() {
  const { code } = parseRoot(Content, Schema)
  return <Code codeblock={code} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return <Pre code={highlighted} handlers={[tokenTransitions]} />
}

const handler: AnnotationHandler = {
  name: "foo",
  Pre: forwardRef<HTMLPreElement, any>(({ InnerPre, ...props }, ref) => (
    <InnerPre {...props} />
  )),
}
