import type {
  Token,
  CodeData,
  CodeInfo,
  CodeAnnotation,
  Theme,
} from "./types.js"

import { highlight } from "./highlight.js"

export { Token, CodeData, CodeInfo, CodeAnnotation, Theme }
export { highlight }

export type AnnotationComponents = {}

export function CodeContent({
  info,
  components = {},
  className,
}: {
  info: CodeInfo
  components: AnnotationComponents
  className?: string
}) {
  if (!info) return null
  return (
    <pre
      data-theme={info.themeName}
      data-lang={info.lang}
      className={className}
    >
      {info.code}
    </pre>
  )
}
