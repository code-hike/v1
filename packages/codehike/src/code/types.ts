export type Theme = string

type Color = string
export type Token = [string, Color?, React.CSSProperties?]
export type Whitespace = string
export type Tokens = (Token | Whitespace)[]

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type BlockAnnotation = {
  /** Annotation name (used to find the right AnnotationComponent) */
  name: ComponentName
  /** String metadata */
  query: string
  /** Line number where the annotation block starts */
  fromLineNumber: number
  /** Line number (inclusive) where the annotation block ends  */
  toLineNumber: number
  /** Optional data */
  data?: any
}

export type InlineAnnotation = {
  /** Annotation name (used to find the right AnnotationComponent) */
  name: ComponentName
  /** String metadata */
  query: string
  /** Line number  */
  lineNumber: number
  /** Column number where the annotation starts */
  fromColumn: number
  /** Column number (inclusive) where the annotation ends */
  toColumn: number
  /** Optional data */
  data?: any
}

export type CodeAnnotation = Prettify<BlockAnnotation | InlineAnnotation>

export function isBlockAnnotation(
  annotation: CodeAnnotation,
): annotation is BlockAnnotation {
  return !isInlineAnnotation(annotation)
}

export function isInlineAnnotation(
  annotation: CodeAnnotation,
): annotation is InlineAnnotation {
  return annotation.hasOwnProperty("lineNumber")
}

export function isWhitespace(token: Token | Whitespace): token is Whitespace {
  return typeof token === "string"
}

/**
 * Represents the basic structure for code data.
 */
export type RawCode = {
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
export type HighlightedCode = {
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

export type BlockAnnotationComponent = React.ComponentType<{
  annotation: BlockAnnotation
  children: React.ReactNode
}>

type LineAnnotationProps = {
  lineNumber: number
  children: React.ReactNode
}
export type LineAnnotationComponent = React.ComponentType<
  LineAnnotationProps & {
    annotation: BlockAnnotation
  }
>

export type InlineAnnotationComponent = React.ComponentType<{
  annotation: InlineAnnotation
  lineNumber: number
  children: React.ReactNode
}>

type TokenAnnotationProps = {
  lineNumber: number
  value: string
  style?: React.CSSProperties
}
export type TokenAnnotationComponent = React.ComponentType<
  TokenAnnotationProps & {
    annotation: BlockAnnotation | InlineAnnotation
  }
>

type CapitalLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
type ComponentName = `${CapitalLetter}${string}`

export type BlockAnnotationComponents = Record<
  `Block${ComponentName}`,
  BlockAnnotationComponent
>

export type LineAnnotationComponents = Record<
  `Line${ComponentName}`,
  LineAnnotationComponent
>

export type TokenAnnotationComponents = Record<
  `Token${ComponentName}`,
  TokenAnnotationComponent
>

export type InlineAnnotationComponents = Record<
  `Inline${ComponentName}`,
  InlineAnnotationComponent
>

export type TokenComponent = React.ComponentType<TokenAnnotationProps>

export type LineComponent = React.ComponentType<LineAnnotationProps>

export type AnnotationComponents = BlockAnnotationComponents &
  LineAnnotationComponents &
  InlineAnnotationComponents &
  TokenAnnotationComponents & {
    Token?: TokenComponent
    Line?: LineComponent
  }

export type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  code: HighlightedCode
  components?: AnnotationComponents
}
export type PreComponent = React.ForwardRefExoticComponent<
  PreProps & React.RefAttributes<HTMLPreElement>
>

export type InternalToken = {
  value: string
  style?: React.CSSProperties
  range: [number, number]
}
