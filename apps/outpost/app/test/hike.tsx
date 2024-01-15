import { HikeSection } from "codehike"
import { Code } from "./code"
import "./styles.css"

export function TestHike({ hike }: { hike: HikeSection }) {
  const { code = [] } = hike

  return (
    <div>
      {code.map((codeblock, i) => (
        <Code
          key={i}
          codeblock={codeblock}
          className="bg-zinc-800 m-2 py-2 text-sm leading-5"
          theme="github-dark"
        />
      ))}
    </div>
  )
}
