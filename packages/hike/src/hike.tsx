import React, { ComponentType } from "react"

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
      const childSlot = slot.slots[name].shift()
      if (!childSlot) {
        throw new Error(`Missing slot ${name}`)
      }
      return slotToStaticJSX(childSlot)
    }
    return child
  })
}

export type Step = {
  query: string
  children: React.ReactNode[]
  slots: { [key: string]: Step[] }
}

export function getStepsFromChildren(
  kids: React.ReactNode,
  query: string = "",
): Step {
  const [children, ...slotElements] = React.Children.toArray(kids)
  const slots: { [key: string]: Step[] } = {}

  slotElements.forEach((slotElement: any) => {
    const { name, query } = slotElement.props || {}
    slots[name] = slots[name] || []
    slots[name].push(getStepsFromChildren(slotElement.props.children, query))
  })

  return {
    query,
    children: React.Children.toArray((children as any).props.children),
    slots,
  }
}
