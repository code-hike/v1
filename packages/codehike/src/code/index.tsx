import type {
  Token,
  RawCode,
  HighlightedCode,
  CodeAnnotation,
  Theme,
  TokenComponent,
  LineComponent,
  InlineAnnotation,
  BlockAnnotation,
  LineAnnotationComponent,
  InlineAnnotationComponent,
  TokenAnnotationComponent,
  BlockAnnotationComponent,
  AnnotationHandler,
  CustomPreProps,
} from "./types.js"

import { highlight } from "./highlight.js"
import { Pre } from "./pre.js"
import { InnerPre, getPreRef } from "./inner.js"

export {
  Token,
  RawCode,
  HighlightedCode,
  TokenComponent,
  LineComponent,
  InlineAnnotation,
  BlockAnnotation,
  InlineAnnotationComponent,
  CodeAnnotation,
  Theme,
  LineAnnotationComponent,
  TokenAnnotationComponent,
  BlockAnnotationComponent,
  AnnotationHandler,
  CustomPreProps,
}
export { highlight, Pre, InnerPre, getPreRef }
