import { CodeContent } from "codehike"

export async function Code({ codeblocks, config, components }) {
  const tabs = codeblocks.map((codeblock) => (
    <SingleCode codeblock={codeblock} config={config} components={components} />
  ))

  return tabs
}

async function SingleCode({ codeblock, config, components }) {
  const { lang, meta, value, annotations } = codeblock

  return (
    <div
      data-ch-theme={config.themeName}
      className="overflow-hidden rounded  bg-[#21252c] ring-1 ring-zinc-300/20"
    >
      <div className="border-b border-zinc-300/20 bg-[#21252c] p-2 pl-4 text-xs font-bold">
        {meta}
      </div>
      <CodeContent
        codeblock={codeblock}
        config={config}
        components={components}
        data-ch-lang={lang}
      />
    </div>
  )
}
