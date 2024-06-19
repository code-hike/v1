import type {
  Token,
  RawCode,
  HighlightedCode,
  CodeAnnotation,
  Theme,
  InlineAnnotation,
  BlockAnnotation,
  InlineAnnotationComponent,
  TokenAnnotationComponent,
  BlockAnnotationComponent,
  AnnotationHandler,
  CustomPreProps,
} from "./types.js"

import { highlight } from "./highlight.js"
import { Pre } from "./pre.js"
import { InnerPre, getPreRef, InnerLine, InnerToken } from "./inner.js"

export {
  Token,
  RawCode,
  HighlightedCode,
  InlineAnnotation,
  BlockAnnotation,
  InlineAnnotationComponent,
  CodeAnnotation,
  Theme,
  InnerLine,
  InnerToken,
  TokenAnnotationComponent,
  BlockAnnotationComponent,
  AnnotationHandler,
  CustomPreProps,
}
export { highlight, Pre, InnerPre, getPreRef }
