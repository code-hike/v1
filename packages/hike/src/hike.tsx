import React, { ComponentType } from "react"
import type { Annotation } from "@code-hike/lighter"

export function Hike({
  children,
  as,
  ...rest
}: {
  children: React.ReactNode
  as?: ComponentType<{ hike: HikeSection<string> }>
  [key: string]: any
}) {
  if (!as) {
    return <StaticHike children={children} />
  }
  const hike = getStepsFromChildren(children)
  return React.createElement(as, { hike, ...rest })
}

function StaticHike({ children }: { children: React.ReactNode }) {
  const hike = getStepsFromChildren(children)
  return slotToStaticJSX(hike)
}

function slotToStaticJSX(section: HikeSection<string>): React.ReactNode[] {
  return section.children.flatMap((child: any) => {
    if (child.type === React.Fragment && child.key) {
      const name = child.key
      if (name === "code") {
        return section.code!.map((code, i) => (
          <pre key={i}>
            <code className={code.lang}>{code.value}</code>
          </pre>
        ))
      }
      const sections = section[name]!
      const childSlot = sections.shift()
      if (!childSlot) {
        throw new Error(`Missing slot ${name}`)
      }
      return slotToStaticJSX(childSlot)
    }
    return child
  })
}
export type CodeBlock = {
  value: string
  lang: string
  meta?: string
  parentPath?: string
}

export type HikeSection<T extends string = "steps"> = {
  [key in T]?: HikeSection<T>[]
} & {
  children: React.ReactNode[]
  query: string
  code?: CodeBlock[]
}

export function getStepsFromChildren(
  kids: React.ReactNode,
  query: string = "",
): HikeSection<string> {
  const [children, ...slotElements] = React.Children.toArray(kids)
  const slots: { [key: string]: HikeSection<string>[] } = {}
  const code: CodeBlock[] = []

  slotElements.forEach((slotElement: any) => {
    const { name, query } = slotElement.props || {}

    if (name === "code") {
      code.push(getCodeBlockFromChildren(slotElement.props.children))
    } else {
      slots[name] = slots[name] || []
      slots[name].push(getStepsFromChildren(slotElement.props.children, query))
    }
  })

  return {
    query,
    children: React.Children.toArray((children as any).props.children).map(
      (e: any) =>
        e.type === "placeholder" ? <React.Fragment key={e.props.name} /> : e,
    ),
    ...slots,
    code,
  } as any
}

function getCodeBlockFromChildren(children: React.ReactNode): CodeBlock {
  const { props } = React.Children.toArray(children)[0] as any
  return {
    value: props.code,
    meta: props.meta,
    lang: props.lang,
    parentPath: props.parentPath,
  }
}
