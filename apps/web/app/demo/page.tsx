import Demo from "@/demos/test/page"
import Content from "./content.md"
import { HighlightedCode, Pre } from "codehike/code"

export default function Page() {
  return <Content />
}

// function Code({ codeblock }: { codeblock: HighlightedCode }) {
//   return <Pre code={codeblock} />
// }
