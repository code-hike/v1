import { highlight, Theme, Lines, Tokens, Annotation } from "@code-hike/lighter"
import {
  AnyToken,
  FinalConfig,
  FinalToken,
  isGroup,
  isWhitespace,
} from "./types.js"
import { splitAnnotationsAndCode } from "./extract-annotations.js"

export type TokenItem = AnyToken
export type TokenList = AnyToken[]

export async function tokenize(
  codeWithoutAnnotations: string,
  lang: string,
  annotations: Annotation[],
  config: FinalConfig,
) {
  const { theme } = config

  const { lines } = await highlight(codeWithoutAnnotations, lang, theme, {
    annotations,
    scopes: true,
  })
  const tokens = joinLines(lines)
  // split surrounding whitespace for each token
  const splitTokens = splitWhitespace(tokens)

  // join consecutive whitespace tokens
  const joinedTokens = joinWhitespace(splitTokens)

  return joinedTokens
}

// group the Lines into one array
function joinLines(lines: Lines): AnyToken[] {
  const joinedTokens: AnyToken[] = []
  lines.forEach((lineOrGroup) => {
    if ("lines" in lineOrGroup) {
      joinedTokens.push([
        [lineOrGroup.annotationName, lineOrGroup.annotationQuery],
        joinLines(lineOrGroup.lines),
      ])
    } else {
      const tokens = joinTokens(lineOrGroup.tokens)
      joinedTokens.push(...tokens)
      joinedTokens.push("\n")
    }
  })
  return joinedTokens
}

function joinTokens(tokens: Tokens): AnyToken[] {
  return tokens.map((tokenOrGroup) => {
    if ("tokens" in tokenOrGroup) {
      return [
        [
          tokenOrGroup.annotationName,
          tokenOrGroup.annotationQuery,
          { inline: true },
        ],
        joinTokens(tokenOrGroup.tokens),
      ]
    } else {
      const t = [tokenOrGroup.content] as FinalToken
      const { color, ...rest } = tokenOrGroup.style || {}
      t.push(color)
      if (Object.keys(rest).length) {
        t.push(rest)
      }
      return t
    }
  })
}

function splitWhitespace(tokens: AnyToken[]) {
  const ejected: AnyToken[] = []
  tokens.forEach((tokenOrGroup) => {
    if (isGroup(tokenOrGroup)) {
      ejected.push([tokenOrGroup[0], splitWhitespace(tokenOrGroup[1])])
    } else if (isWhitespace(tokenOrGroup)) {
      ejected.push(tokenOrGroup)
    } else {
      const [before, content, after] = splitSurroundingWhitespace(
        tokenOrGroup[0],
      )
      if (before?.length) {
        ejected.push(before)
      }
      if (content.length) {
        const copy = [...tokenOrGroup] as FinalToken
        copy[0] = content
        ejected.push(copy)
      }
      if (after?.length) {
        ejected.push(after)
      }
    }
  })
  return ejected
}

function joinWhitespace(tokens: AnyToken[]) {
  const joinedTokens: AnyToken[] = []
  tokens.forEach((tokenOrGroup) => {
    if (isGroup(tokenOrGroup)) {
      joinedTokens.push([tokenOrGroup[0], joinWhitespace(tokenOrGroup[1])])
    } else if (isWhitespace(tokenOrGroup)) {
      let last = joinedTokens[joinedTokens.length - 1]
      if (last && isWhitespace(last)) {
        joinedTokens[joinedTokens.length - 1] += tokenOrGroup
      } else if (tokenOrGroup !== "") {
        joinedTokens.push(tokenOrGroup)
      }
    } else if (tokenOrGroup[0].length > 0) {
      joinedTokens.push(tokenOrGroup)
    }
  })
  return joinedTokens
}

// splits " \t foo bar \n" into [" \t ","foo bar"," \n"]
// "foo bar" -> ["","foo bar",""]
function splitSurroundingWhitespace(content: string) {
  const trimmed = content.trim()
  const before = content.slice(0, content.indexOf(trimmed))
  const after = content.slice(content.indexOf(trimmed) + trimmed.length)
  return [before, trimmed, after]
}
