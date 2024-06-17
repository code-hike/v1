"use client"

import React from "react"
import {
  CustomPreProps,
  HighlightedCode,
  InnerPre,
  InnerToken,
  getPreRef,
} from "codehike/code"
import { AnnotationHandler, Pre } from "codehike/code"
import {
  TokenTransitionsSnapshot,
  calculateTransitions,
  getStartingSnapshot,
} from "codehike/utils/token-transitions"

export function CodeSwitcher({ infos }: { infos: HighlightedCode[] }) {
  const [index, setIndex] = React.useState(0)
  const next = () => setIndex((index + 1) % infos.length)

  return (
    <>
      <CodeClient highlighted={infos[index]} />
      <div className="p-2 mt-auto font-light text-center text-white">
        <button onClick={next} className="border border-current rounded px-2">
          Switch code
        </button>
      </div>
    </>
  )
}

export function CodeClient(props: { highlighted: HighlightedCode }) {
  const { highlighted } = props
  return (
    <Pre
      code={highlighted}
      handlers={[handler]}
      className="m-0 h-80 bg-zinc-950"
    />
  )
}

const MAX_TRANSITION_DURATION = 900 // milliseconds
class SmoothPre extends React.Component<CustomPreProps> {
  ref: React.RefObject<HTMLPreElement>
  constructor(props: CustomPreProps) {
    super(props)
    this.ref = getPreRef(this.props)
  }

  render() {
    return <InnerPre merge={this.props} style={{ position: "relative" }} />
  }

  getSnapshotBeforeUpdate() {
    return getStartingSnapshot(this.ref.current!)
  }

  componentDidUpdate(
    prevProps: never,
    prevState: never,
    snapshot: TokenTransitionsSnapshot,
  ) {
    const transitions = calculateTransitions(this.ref.current!, snapshot)
    transitions.forEach(({ element, keyframes, options }) => {
      const { translateX, translateY, ...kf } = keyframes as any
      if (translateX && translateY) {
        kf.translate = [
          `${translateX[0]}px ${translateY[0]}px`,
          `${translateX[1]}px ${translateY[1]}px`,
        ]
      }
      element.animate(kf, {
        duration: options.duration * MAX_TRANSITION_DURATION,
        delay: options.delay * MAX_TRANSITION_DURATION,
        easing: options.easing,
        fill: "both",
      })
    })
  }
}

const handler: AnnotationHandler = {
  name: "code-switcher",
  PreWithRef: SmoothPre,
  Token: (props) => (
    <InnerToken merge={props} style={{ display: "inline-block" }} />
  ),
}
