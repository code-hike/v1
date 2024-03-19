export type Theme = string

type Color = string
export type Token = [string, Color?, React.CSSProperties?]
export type Whitespace = string
export type Tokens = (Token | Whitespace)[]

export type BlockAnnotation = [
  Capitalize<string>, // annotation name
  [number, number],
  string?, // query
]

export type InlineAnnotation = [
  Capitalize<string>, // annotation name
  number, // line number
  [number, number],
  string?, // query
]

export type CodeAnnotation = BlockAnnotation | InlineAnnotation

export function isBlockAnnotation(
  annotation: CodeAnnotation,
): annotation is BlockAnnotation {
  const lineRange = annotation[1]
  return Array.isArray(lineRange)
}

export function isInlineAnnotation(
  annotation: CodeAnnotation,
): annotation is InlineAnnotation {
  return !isBlockAnnotation(annotation)
}

export function isWhitespace(token: Token | Whitespace): token is Whitespace {
  return typeof token === "string"
}

/**
 * Represents the basic structure for code data.
 */
export type CodeData = {
  /** This is the raw code. May include annotation comments. */
  value: string

  /** The programming language. */
  lang: string

  /** Metadata string (the content after the language name in a markdown codeblock). */
  meta: string
}

/**
 * Represents detailed information about a piece of code, including its tokens and annotations.
 */
export type CodeInfo = {
  /** This is the raw code. May include annotation comments. */
  value: string

  /** The code with annotation comments removed. */
  code: string

  /** A list of code annotations. */
  annotations: CodeAnnotation[]

  /** The list of highlighted tokens. Whitespace tokens include newline characters. */
  tokens: (Token | Whitespace)[]

  /** The normalized (for example: py becomes python) language used for highlighting. */
  lang: string

  /** Metadata string */
  meta: string

  /** The name of the theme used for highlighting. */
  themeName: string
}

export type BlockComponent = React.ComponentType<{
  query?: string
  children: React.ReactNode
}>

export type TokenComponent = React.ComponentType<{
  value: string
  style?: React.CSSProperties
  query?: string
}>

export type LineComponent = React.ComponentType<{
  lineNumber: number
  query?: string
  children: React.ReactNode
}>

export type AnnotationComponents = Record<
  Capitalize<string>,
  BlockComponent | TokenComponent | LineComponent
>

export type InternalToken = {
  value: string
  style?: React.CSSProperties
  range: [number, number]
}
