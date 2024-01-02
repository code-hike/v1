import { Annotation, Theme } from "@code-hike/lighter"

export type FinalToken = [string, string?, React.CSSProperties?]
export type Whitespace = string
export type Group = [[string, string?, { inline: true }?], AnyToken[]]
export type AnyToken = FinalToken | Group | Whitespace

export function isFinalToken(token: AnyToken): token is FinalToken {
  return Array.isArray(token) && typeof token[0] === "string"
}

export function isGroup(token: AnyToken): token is Group {
  return Array.isArray(token) && Array.isArray(token[0])
}

export function isWhitespace(token: AnyToken): token is Whitespace {
  return typeof token === "string"
}

export type FinalConfig = {
  theme: Theme
  themeName: string
  annotationPrefix: string
}

export type CodeBlock = {
  lang: string
  meta: string
  value: string
  annotations: Annotation[]
}
