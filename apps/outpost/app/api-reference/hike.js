import React from "react"
import { Code } from "./code"
import { Hike } from "./hike.client"
import theme from "../../theme.mjs"

export function HikeLayout({ hike }) {
  const codehike = addCode(hike)

  return <Hike codehike={codehike} />
}

function addCode(slot, parentCodeBlocks = []) {
  const { slots } = slot

  console.log("-", slot.query)

  const hasCode = slot.code && slot.code.length

  // console.log({ q: slot.query, hasCode })

  const newSlots = {}

  Object.keys(slots).forEach((key) => {
    newSlots[key] = slots[key].map((s) =>
      addCode(s, hasCode ? slot.code : parentCodeBlocks),
    )
  })

  if (!hasCode) {
    return {
      ...slot,
      slots: newSlots,
    }
  }

  console.log("x", slot.query)

  const codeblocks = [...parentCodeBlocks]

  // merge codeblock with parents
  slot.code.forEach((codeblock) => {
    const parent = codeblocks.find(
      (c) => c.meta === codeblock.meta && c.lang === codeblock.lang,
    )

    let newBlock = { ...codeblock }

    if (parent && codeblock.value.trim() === "") {
      // only annotations
      newBlock = {
        ...codeblock,
        value: parent.value,
        annotations: codeblock.annotations.filter((a) => a.name !== "Line"),
      }
    }

    if (parent) {
      // replace parent with new block
      const index = codeblocks.indexOf(parent)
      codeblocks[index] = newBlock
    } else {
      codeblocks.push(newBlock)
    }
  })

  // console.log(codeblocks.flatMap((c) => c.annotations)[0])

  return {
    ...slot,
    codeElement: (
      <Code
        codeblocks={codeblocks}
        config={{ theme, themeName: theme.name, annotationPrefix: "!" }}
        components={{ Mark }}
      />
    ),
    slots: newSlots,
  }
}

function Mark({ children }) {
  return <div className="bg-blue-500/20 rounded">{children}</div>
}
