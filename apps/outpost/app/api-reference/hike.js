import React from "react"
import { Code } from "./code"
import { Hike } from "./hike.client"
import theme from "../../theme.mjs"

export async function HikeLayout({ hike }) {
  const codehike = addCode(hike)

  return <Hike codehike={codehike} />
}

function addCode(slot, parentCodeBlocks = []) {
  const { query, children, code, ...slots } = slot

  const hasCode = code && code.length

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
        annotations: [
          ...parent.annotations,
          ...codeblock.annotations.filter((a) => a.name !== "Line"),
        ],
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

  return {
    query,
    children,
    codeElement: (
      <Code
        codeblocks={codeblocks}
        config={{ theme, themeName: theme.name, annotationPrefix: "!" }}
        components={{ Mark }}
      />
    ),
    ...newSlots,
  }
}

function Mark({ children }) {
  return <div className="bg-blue-500/20 rounded">{children}</div>
}
