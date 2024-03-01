import { ZodTypeDef, z } from "zod"

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
  url: z.string(),
  alt: z.string(),
  title: z.string(),
})

export function parse<Output, Def extends ZodTypeDef, Input>(
  content: unknown,
  Schema: z.ZodType<Output, Def, Input>,
): Output {
  const result = Schema.safeParse(content)
  if (result.success) {
    return result.data
  }

  const error = result.error.errors[0]

  let p = error.path.slice()
  let block = content as any
  let location = ""
  while (p.length) {
    const key = p.shift()!
    block = block[key]
    if (block?._data?.header) {
      location += `\n${block._data.header}`
    }
  }

  const { path, code, message, ...rest } = error
  const name = path[path.length - 1]

  throw new Error(`at ${location || "root"}
Error for \`${name}\`: ${message}
${JSON.stringify(rest, null, 2)}
  `)
}
