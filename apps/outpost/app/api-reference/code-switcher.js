"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const names = {
  js: "Node.js",
  py: "Python",
}

export function CodeSwitcher({ options }) {
  const [option, setOption] = React.useState(options[0])

  const setOptionByLang = (lang) => {
    setOption(options.find((option) => option.lang === lang))
  }

  return (
    <>
      <div className="border-b items-center border-zinc-300/20 bg-zinc-700/50 p-2 pl-4 text-xs font-bold flex">
        {option.meta}

        <Select value={option.lang} onValueChange={setOptionByLang}>
          <SelectTrigger className="w-24 text-xs h-6 ml-auto dark:bg-zinc-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, i) => (
              <SelectItem key={i} value={option.lang}>
                {names[option.lang] || option.lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {option.children}
    </>
  )
}
