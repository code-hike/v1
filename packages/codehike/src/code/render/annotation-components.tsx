type SomeComponents = Record<
  string,
  React.ComponentType<{ query?: string; children: React.ReactNode }>
>

export type AnnotationComponents = Omit<SomeComponents, "Token"> & {
  Token?: React.ComponentType<{ value: string; style?: React.CSSProperties }>
}
