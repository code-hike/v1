import React, { ComponentType } from "react"
import type { Annotation } from "@code-hike/lighter"

export function Hike({
  children,
  as,
  ...rest
}: {
  children: React.ReactNode
  as?: ComponentType<{ hike: Step }>
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

function slotToStaticJSX(slot: Step): React.ReactNode[] {
  return slot.children.flatMap((child: any) => {
    if (child.type === "placeholder") {
      const name = child.props.name
      if (name === "code") {
        return slot.code!.map((code, i) => (
          <pre key={i}>
            <code className={code.lang}>{code.value}</code>
          </pre>
        ))
      }
      const childSlot = slot.slots[name].shift()
      if (!childSlot) {
        throw new Error(`Missing slot ${name}`)
      }
      return slotToStaticJSX(childSlot)
    }
    return child
  })
}
type CodeBlock = {
  value: string
  lang: string
  meta: string
  annotations: Annotation[]
  parentPath?: string
}

export type Step = {
  query: string
  children: React.ReactNode[]
  slots: { [key: string]: Step[] }
  code?: CodeBlock[]
}

export function getStepsFromChildren(
  kids: React.ReactNode,
  query: string = "",
): Step {
  const [children, ...slotElements] = React.Children.toArray(kids)
  const slots: { [key: string]: Step[] } = {}
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
    children: React.Children.toArray((children as any).props.children),
    slots,
    code,
  }
}

function getCodeBlockFromChildren(children: React.ReactNode): CodeBlock {
  const { props } = React.Children.toArray(children)[0] as any
  return {
    value: props.code,
    meta: props.meta,
    lang: props.lang,
    annotations: props.annotations,
    parentPath: props.parentPath,
  }
}
