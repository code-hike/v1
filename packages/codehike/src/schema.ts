import { z } from "zod"

export const Block = z.object({
  query: z.string(),
  children: z.array(z.custom<React.ReactNode>()),
})

export const Code = z.object({
  meta: z.string(),
  value: z.string(),
  lang: z.string(),
})

export const Image = z.object({
  src: z.string(),
  alt: z.string(),
  title: z.string(),
})

export function parse<Output>(Schema: z.ZodType<Output>, content: any): Output {
  const result = Schema.safeParse(content)
  if (result.success) {
    return result.data
  }
  throw result.error
}
