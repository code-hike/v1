"use client"

import React from "react"
import {
  SnapshotElement,
  animateChange,
  getFirstSnapshot,
} from "./utils/animate-tokens"

// export const CodeTransitions = forwardRef(
//   ({ InnerPre, ...rest }: { InnerPre: any }, ref) => {
//     return <InnerPre {...rest} />
//   },
// )

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
