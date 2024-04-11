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
  AnnotationComponents2 as AnnotationComponents,
} from "./types.js"

import { highlight } from "./highlight.js"
import { Pre } from "./pre.js"

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
  AnnotationComponents,
}
export { highlight, Pre }
