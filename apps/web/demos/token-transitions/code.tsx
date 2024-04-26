"use client"

import React, { forwardRef } from "react"
import {
  animateChange,
  getFirstSnapshot,
  SnapshotElement,
} from "./animate-tokens"
import {
  AnnotationHandler,
  HighlightedCode,
  Pre,
  TokenComponent,
} from "codehike/code"

export function CodeSwitcher({ infos }: { infos: HighlightedCode[] }) {
  const [index, setIndex] = React.useState(0)

  const next = () => setIndex((index + 1) % infos.length)

  return (
    <>
      <CodeClient info={infos[index]} />
      <div className="p-2 mt-auto font-light text-center text-white">
        <button onClick={next} className="border border-current rounded px-2">
          Switch code
        </button>
      </div>
    </>
  )
}

export function CodeClient({ info, ...rest }: { info: HighlightedCode }) {
  return (
    <Pre
      code={info}
      {...rest}
      handlers={[tokenTransitions]}
      className="m-0 h-80 bg-zinc-950"
    />
  )
}

const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  Pre: forwardRef<HTMLPreElement, any>((props, ref) => (
    <CodeTransitions {...props} ref={ref} />
  )),
  Token: ({ InnerToken, ...props }) => (
    <InnerToken merge={props} className="inline-block" />
  ),
}

export class CodeTransitions extends React.Component<{
  InnerPre: any
}> {
  ref: React.RefObject<HTMLPreElement>

  constructor(props: any) {
    super(props)
    this.ref = React.createRef<HTMLPreElement>()
  }

  getSnapshotBeforeUpdate() {
    return getFirstSnapshot(this.ref.current!)
  }

  componentDidUpdate(
    prevProps: any,
    prevState: any,
    firstSnapshot: SnapshotElement[],
  ) {
    animateChange(this.ref.current!, firstSnapshot)
  }

  render() {
    const { InnerPre, ...rest } = this.props
    return (
      <InnerPre ref={this.ref} style={{ position: "relative" }} {...rest} />
    )
  }
}
