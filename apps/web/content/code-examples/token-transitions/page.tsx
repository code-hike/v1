import { CodeData, Pre, highlight } from "codehike/code"
// @ts-ignore
import { getBlocks } from "./content.md"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { CodeClient, CodeSwitcher } from "./code"

export default async function Page() {
  const { code } = getBlocks()

  const infos = await Promise.all(
    code.map((codeblock: any) =>
      highlight(codeblock, "github-dark"),
    ),
  )
  return <CodeSwitcher infos={infos} />
}
