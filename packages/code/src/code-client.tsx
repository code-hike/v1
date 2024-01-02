"use client"

import React from "react"
import {
  animateChange,
  getFirstSnapshot,
  SnapshotElement,
} from "./animate-tokens.js"

export class CodeClient extends React.Component<{
  children: React.ReactNode
}> {
  ref: React.RefObject<HTMLPreElement>

  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.ref = React.createRef<HTMLPreElement>()
    // this.handleSelection = this.handleSelection.bind(this)
  }

  componentDidMount() {
    // document.addEventListener("selectionchange", this.handleSelection)
    // this.ref.current?.querySelector("[data-ch-focus]")?.scrollIntoView({
    //   block: "center",
    //   // block: "nearest",
    //   behavior: "instant",
    // })
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
    const { children, ...rest } = this.props
    return (
      <pre
        ref={this.ref}
        style={{
          position: "relative",
          backgroundColor: "var(--ch-t-background)",
          color: "var(--ch-t-foreground)",
          colorScheme: "var(--ch-t-colorScheme)",
        }}
        {...rest}
      >
        {children}
      </pre>
    )
  }
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
