import {
  SelectionProvider,
  Selectable,
  Selection,
} from "codehike/utils/selection"

import { THEME_NAMES } from "@code-hike/lighter"
import { Pre, highlight } from "codehike/code"

const themes = THEME_NAMES.filter((name) => !name.includes("from-css"))

export async function ThemePicker() {
  return (
    <SelectionProvider className="flex gap-4">
      <div>
        {themes.map((name, index) => (
          <Selectable key={index} index={index} selectOn={["click"]}>
            {name}
          </Selectable>
        ))}
      </div>
      <Selection
        from={themes.map((name) => (
          <div>
            <Code theme={name} />
          </div>
        ))}
      />
    </SelectionProvider>
  )
}

async function Code({ theme }: { theme: string }) {
  const code = `import { Pre, RawCode, highlight } from "codehike/code"
  
async function Code({codeblock}: {codeblock: RawCode}) {
  const highlighted = await highlight(codeblock, "${theme}")
  return <Pre code={highlighted} />
}`
  const rawCode = {
    value: code,
    lang: "tsx",
    meta: "",
  }
  const highlighted = await highlight(rawCode, theme as any)
  return <Pre code={highlighted} />
}
