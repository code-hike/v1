type Color = string
export type Token = [string, Color?, React.CSSProperties?]
export type Whitespace = string
export type Tokens = (Token | Whitespace)[]

export type InternalToken = {
  value: string
  style?: React.CSSProperties
  range: [number, number]
}

export type BlockAnnotation = [
  string, // annotation name
  [number, number],
  string?, // query
]

export type InlineAnnotation = [
  string, // annotation name
  number, // line number
  [number, number],
  string?, // query
]

export type Annotation = BlockAnnotation | InlineAnnotation

export function isBlockAnnotation(
  annotation: Annotation,
): annotation is BlockAnnotation {
  const lineRange = annotation[1]
  return Array.isArray(lineRange)
}

export function isInlineAnnotation(
  annotation: Annotation,
): annotation is InlineAnnotation {
  return !isBlockAnnotation(annotation)
}
