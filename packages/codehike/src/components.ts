import { MDXProps } from "mdx/types.js"
import { Hike, HikeSection } from "./hike.js"
import { ZodTypeDef, z } from "zod"
import { parse } from "./schema.js"

export { Hike }

export type { HikeSection }

type MDXContent = (props: MDXProps) => JSX.Element

export function getBlocks(Content: MDXContent, props: MDXProps = {}) {
  const result = Content({
    _returnBlocks: true,
    ...props,
    components: { Hike: true, ...props.components } as any,
  }) as any
  return result
}

export function parseContent<Output, Def extends ZodTypeDef, Input>(
  Schema: z.ZodType<Output, Def, Input>,
  Content: MDXContent,
  props: MDXProps = {},
) {
  const data = getBlocks(Content, props)
  return parse(data, Schema)
}
