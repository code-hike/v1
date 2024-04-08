import { docs } from "@/app/source"
import { Block } from "codehike/schema"
import { Demo } from "@/components/demo"
import { parseContent } from "codehike"
import { CodeWithNotes } from "@/components/code/code-with-notes"
import Link from "next/link"

export function AllCodeDemos() {
  const p = docs.getPages()
  const codePages = p.filter((page) => page.slugs[0] === "code")
  const demoPages = codePages.filter(
    (page) => page.data.layout === "PreviewAndImplementation",
  )

  return demoPages.map((page) => {
    const { title, exports } = page.data
    const { default: MDX } = exports
    const { demo } = parseContent(Block.extend({ demo: Block }), MDX, {
      components: { Demo, CodeWithNotes },
    })
    const href = `/docs/${page.slugs.join("/")}`

    return (
      <div key={title}>
        <h2>{title}</h2>
        {demo.children}
        <p>
          See <Link href={href}>{title} implementation</Link>.
        </p>
      </div>
    )
  })
}
