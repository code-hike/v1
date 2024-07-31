import type {
  Token,
  RawCode,
  HighlightedCode,
  CodeAnnotation,
  Theme,
  InlineAnnotation,
  BlockAnnotation,
  InlineAnnotationComponent,
  BlockAnnotationComponent,
  AnnotationHandler,
  CustomPreProps,
  CustomPre,
  CustomLine,
  CustomLineWithAnnotation,
  CustomToken,
  CustomTokenWithAnnotation,
} from "./types.js"

import { highlight } from "./highlight.js"
import { Pre } from "./pre.js"
import { InnerPre, getPreRef, InnerLine, InnerToken } from "./inner.js"

export type {
  RawCode,
  HighlightedCode,
  Token,
  InlineAnnotation,
  BlockAnnotation,
  CodeAnnotation,
  // AnnotationHandler:
  AnnotationHandler,
  CustomPre,
  CustomPreProps,
  BlockAnnotationComponent,
  CustomLine,
  CustomLineWithAnnotation,
  InlineAnnotationComponent,
  CustomToken,
  CustomTokenWithAnnotation,
  Theme,
}

export { highlight, Pre, InnerPre, InnerLine, InnerToken, getPreRef }
