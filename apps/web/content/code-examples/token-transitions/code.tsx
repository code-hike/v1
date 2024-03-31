"use client"

import React from "react"
import {
  animateChange,
  getFirstSnapshot,
  SnapshotElement,
} from "./animate-tokens"
import {
  HighlightedCode,
  Pre,
  TokenComponent,
} from "codehike/code"

export function CodeSwitcher({
  infos,
}: {
  infos: HighlightedCode[]
}) {
  const [index, setIndex] = React.useState(0)

  const next = () => setIndex((index + 1) % infos.length)

  return (
    <div className="h-full">
      <button onClick={next}>Next</button>
      <CodeClient code={infos[index]} />
    </div>
  )
}

export class CodeClient extends React.Component<{
  info: HighlightedCode
}> {
  ref: React.RefObject<HTMLPreElement>

  constructor(props: { info: HighlightedCode }) {
    super(props)
    this.ref = React.createRef<HTMLPreElement>()
    // this.handleSelection = this.handleSelection.bind(this)
  }

  componentDidMount() {
    // document.addEventListener("selectionchange", this.handleSelection)
  }

  componentWillUnmount() {
    // document.removeEventListener("selectionchange", this.handleSelection)
  }

  handleSelection() {
    // const selected = document.getSelection()?.toString().trim() ?? ""
    // TODO fix old firefox
    // this.ref.current
    //   ?.querySelectorAll("span:not(:has(*))")
    //   .forEach((element) => {
    //     if (element.textContent === selected) {
    //       element.classList.add("ch-selected")
    //     } else {
    //       element.classList.remove("ch-selected")
    //     }
    //   })
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
        className="h-80"
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

// on selectionchange
// function handleSelection(e: Event) {
//   const selected = document.getSelection()?.toString().trim() ?? ""

//   ref.current.querySelectorAll("span:not(:has(*))").forEach(element => {
//     if (element.textContent === selected) {
//       element.classList.add("selected")
//     } else {
//       element.classList.remove("selected")
//     }
//   })
// }
