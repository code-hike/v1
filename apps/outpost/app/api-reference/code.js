import { CodeContent } from "codehike"
import { CodeSwitcher } from "./code-switcher"

export async function Code({ codeblocks, config, components }) {
  const blocks = {}
  codeblocks.forEach((codeblock) => {
    const { meta } = codeblock
    if (!blocks[meta]) {
      blocks[meta] = []
    }
    blocks[meta].push(codeblock)
  })

  const tabs = Object.entries(blocks).map(([meta, codeblocks]) =>
    codeblocks.length > 1 ? (
      <MultiCode
        codeblocks={codeblocks}
        config={config}
        components={components}
      />
    ) : (
      <SingleCode
        codeblock={codeblocks[0]}
        config={config}
        components={components}
      />
    ),
  )

  return tabs
}

async function MultiCode({ codeblocks, config, components }) {
  const options = codeblocks.map((codeblock) => ({
    meta: codeblock.meta,
    lang: codeblock.lang,
    children: (
      <CodeContent
        codeblock={codeblock}
        config={config}
        components={components}
        data-ch-lang={codeblock.lang}
        className="px-4 py-2 !bg-zinc-800/50 leading-normal"
      />
    ),
  }))

  return (
    <div
      data-ch-theme={config.themeName}
      className="overflow-hidden rounded ring-1 ring-zinc-300/20 mb-4"
    >
      <CodeSwitcher options={options} />
    </div>
  )
}

async function SingleCode({ codeblock, config, components }) {
  const { lang, meta, value, annotations } = codeblock

  return (
    <div
      data-ch-theme={config.themeName}
      className="overflow-hidden rounded ring-1 ring-zinc-300/20 mb-4"
    >
      <div className="border-b border-zinc-300/20 bg-zinc-700/50 p-2 pl-4 text-xs font-bold">
        {meta}
      </div>
      <CodeContent
        codeblock={codeblock}
        config={config}
        components={components}
        data-ch-lang={lang}
        className="px-4 py-2 !bg-zinc-800/50 leading-normal"
      />
    </div>
  )
}
