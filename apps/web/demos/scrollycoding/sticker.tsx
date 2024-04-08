"use client"

import React from "react"

const TheContext = React.createContext<{
  selectedIndex: number
  selectIndex: (value: number) => void
}>({
  selectedIndex: 0,
  selectIndex: () => {},
})

export function Tabs(props: React.HTMLProps<HTMLDivElement>) {
  return <div {...props} />
}

export function Tab(
  props: React.HTMLProps<HTMLDivElement> & {
    onClickValue?: string
    onScrollValue?: string
  },
) {
  return <div {...props} />
}

export function TabPanel(
  props: React.HTMLProps<HTMLDivElement> & {
    items?: { value: string; content: React.ReactNode }[]
  },
) {
  return <div {...props} />
}
