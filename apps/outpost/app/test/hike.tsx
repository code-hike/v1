import { CodeBlock, HikeSection } from "codehike"
import { Code } from "./code"
import "./styles.css"
import { z } from "../../lib/z"

const HikeSchema = z.hike({
  sections: z.sections({
    steps: z.sections({
      preface: z.optional(z.section({})),
      code: z.optional(z.codeblock()),
    }),
  }),
  quiz: z.section({
    questions: z.sections({
      options: z.sections({}),
    }),
  }),
})

export function TestHike({ hike }: { hike: HikeSection }) {
  const data = HikeSchema.parse(hike)
  // const { sections, quiz } = data
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
