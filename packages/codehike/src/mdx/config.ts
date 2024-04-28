import { Theme } from "@code-hike/lighter"

/**
 * Code Hike configuration object
 * @see [configuration documentation](https://codehike.org/docs)
 */
export type CodeHikeConfig = {
  components?: {
    code?: string
  }
  syntaxHighlighting?: {
    theme?: Theme
  }
}
