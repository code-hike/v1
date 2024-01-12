"use client"
import { HikeSection } from "codehike"
import { ChevronRight } from "lucide-react"

import React from "react"

export function Property({ property }: { property: HikeSection }) {
  const [name, ...rest] = property.query.split(" ")
  const type = rest.join(" ")

  return (
    <div className="mb-6">
      <h4>
        <span className="font-mono">{name}</span>
        <span className="ml-2 text-sm text-slate-400">{type}</span>
      </h4>
      {property.children}
      <SubProperties properties={property.steps} />
    </div>
  )
}

export function ExtraProperty({ property }: { property: HikeSection }) {
  const [collapsed, setCollapsed] = React.useState(true)
  const [name, ...rest] = property.query.split(" ")
  const type = rest.join(" ")

  return (
    <div className="mb-4">
      <h4 onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
        <ChevronRight
          size={16}
          className={`inline-block mr-1 -ml-5 transform ${
            collapsed ? "" : "rotate-90"
          } transition-transform`}
        />
        <span className="font-mono">{name}</span>
        <span className="ml-2 text-sm text-slate-400">{type}</span>
      </h4>
      <div className={collapsed ? "hidden" : ""}>
        {property.children}
        <SubProperties properties={property.steps} />
      </div>
    </div>
  )
}

export function SubProperties({ properties }: { properties?: HikeSection[] }) {
  const [collapsed, setCollapsed] = React.useState(true)
  if (!properties || properties.length === 0) return null

  if (collapsed) {
    return (
      <div
        className="hover:neutral-800 cursor-pointer rounded-xl border border-zinc-300/20 px-4 py-1 text-zinc-400 hover:text-slate-50 select-none"
        onClick={() => setCollapsed(false)}
      >
        Show child attributes
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-300/20 px-4 py-1 ">
      <header
        className=" cursor-pointer pb-1 text-zinc-400 hover:text-slate-50 select-none"
        onClick={() => setCollapsed(true)}
      >
        Hide child attributes
      </header>
      {properties.map((property, i) => (
        <Property property={property} key={i} />
      ))}
    </div>
  )
}
