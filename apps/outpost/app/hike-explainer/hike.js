import theme from "../../theme.mjs"
import { Code } from "./code"
import { Slideshow } from "./hike.client"

const config = { theme, themeName: theme.name, annotationPrefix: "!" }

export function ExplainerLayout({ hike }) {
  const { steps, footer } = hike.slots
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
