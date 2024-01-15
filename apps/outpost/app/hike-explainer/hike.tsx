import { z } from "../../lib/z"
import theme from "../../theme.mjs"
import { Code } from "./code"
import { Slideshow } from "./hike.client"
import type { HikeSection } from "codehike"

const config = { theme, themeName: theme.name, annotationPrefix: "!" }

const HikeSchema = z.hike({
  steps: z.sections({
    code: z.codeblocks(),
  }),
  footer: z.sections({}),
})

export function ExplainerLayout({ hike }: { hike: HikeSection }) {
  const data = HikeSchema.parse(hike)

  const { steps, footer } = data
  const slides = steps.map((step) => {
    const [left, right] = step.code
    return {
      left: <Code codeblock={left} title="MDX file" />,
      right: <Code codeblock={right} title="JSX output" />,
      children: step.children,
      className: step.query,
    }
  })
  return (
    <div data-ch-theme={config.themeName}>
      <Slideshow steps={slides} children={hike.children} footer={footer} />
    </div>
  )
}
