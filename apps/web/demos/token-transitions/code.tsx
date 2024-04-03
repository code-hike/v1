"use client"

import React from "react"
import {
  animateChange,
  getFirstSnapshot,
  SnapshotElement,
} from "./animate-tokens"
import { HighlightedCode, Pre, TokenComponent } from "codehike/code"

export function CodeSwitcher({ infos }: { infos: HighlightedCode[] }) {
  const [index, setIndex] = React.useState(0)

  const next = () => setIndex((index + 1) % infos.length)

  return (
    <>
      <CodeClient info={infos[index]} />
      <div className="p-2 mt-auto font-light text-center">
        <button onClick={next} className="border border-current rounded px-2">
          Switch code
        </button>
      </div>
    </>
  )
}

export class CodeClient extends React.Component<{
  info: HighlightedCode
}> {
  ref: React.RefObject<HTMLPreElement>

  constructor(props: { info: HighlightedCode }) {
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
    const { info, ...rest } = this.props
    return (
      <Pre
        ref={this.ref}
        code={info}
        style={{ position: "relative" }}
        {...rest}
        components={{ Token }}
        className="m-0 h-80"
      />
    )
  }
}

const Token: TokenComponent = ({ value, ...props }) => {
  return (
    <span {...props} className="inline-block">
      {value}
    </span>
  )
}
