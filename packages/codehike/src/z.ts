import { ZodRawShape, z } from "zod"

function hike<Augmentation extends ZodRawShape>(shape: Augmentation) {
  return z
    .object({
      query: z.string(),
      children: z.array(z.custom<React.ReactNode>()),
    })
    .extend(shape)
}

function section<Augmentation extends ZodRawShape>(shape: Augmentation) {
  return sections(shape)
    .length(1)
    .transform((a) => a[0])
}

function sections<Augmentation extends ZodRawShape>(shape: Augmentation) {
  return z.array(
    z
      .object({
        query: z.string(),
        children: z.array(z.custom<React.ReactNode>()),
      })
      .extend(shape),
  )
}

function codeblock() {
  return codeblocks()
    .max(1)
    .transform((a) => a[0])
}

function codeblocks() {
  return z.array(
    z.object({
      value: z.string(),
      lang: z.optional(z.string()),
      meta: z.optional(z.coerce.string()),
      parentPath: z.optional(z.string()),
    }),
  )
}

const y = { ...z, hike, section, codeblock, codeblocks, sections }

export { y as z }
