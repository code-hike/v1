import React, { ComponentType } from "react"
import { DebugHike } from "./debug-hike.js"
import { RawCode } from "./code/types.js"

export function Hike({
  as,
  hike,
  ...rest
}: {
  children: React.ReactNode
  as?: ComponentType<{ hike: HikeSection<string> }>
  [key: string]: any
}) {
  if (!as || rest.debug) {
    return <DebugHike hike={hike} />
  }
  return React.createElement(as, { hike, ...rest })
}

export type HikeSection<T extends string = "steps"> = {
  [key in T]?: HikeSection<T>[]
} & {
  children: React.ReactNode[]
  query: string
  code?: RawCode[]
}

export function getStepsFromChildren(
  kids: React.ReactNode,
  query: string = "",
): HikeSection<string> {
  const [children, ...slotElements] = React.Children.toArray(kids)
  const slots: { [key: string]: HikeSection<string>[] } = {}
  const code: RawCode[] = []

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

function getCodeBlockFromChildren(children: React.ReactNode): RawCode {
  const { props } = React.Children.toArray(children)[0] as any
  return {
    value: props.code,
    meta: props.meta,
    lang: props.lang,
  }
}
