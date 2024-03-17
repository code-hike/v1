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

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
