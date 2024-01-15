import { Theme } from "@code-hike/lighter"
import { tokenize as t } from "./code-to-tokens.js"

export async function tokenize(
  code: string,
  lang: string,
  theme: Theme,
  config: { parentPath?: string; lines?: boolean } = {},
) {
  return t(code, lang, [], {
    theme,
    annotationPrefix: "!",
    ...config,
  } as any)
}
