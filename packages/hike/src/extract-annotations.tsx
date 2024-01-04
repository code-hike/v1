import { Annotation, extractAnnotations } from "@code-hike/lighter"

const extractors: AnnotationsExtractor[] = [
  // extractTwoSlashAnnotations,
  extractLineAnnotations,
  extractCommentAnnotations,
]

type AnnotationsExtractor = (
  code: string,
  lang: string,
  config: any,
) => Promise<{ code: string; annotations: Annotation[] }>

export async function splitAnnotationsAndCode(
  code: string,
  lang: string,
  config: any,
) {
  let annotations: Annotation[] = []
  let codeWithoutAnnotations = code
  for (const extractor of extractors) {
    const { code: newCode, annotations: newAnnotations } = await extractor(
      codeWithoutAnnotations,
      lang,
      config,
    )
    annotations = [...annotations, ...newAnnotations]
    codeWithoutAnnotations = newCode
  }

  return { code: codeWithoutAnnotations, annotations }
}

async function extractCommentAnnotations(
  code: string,
  lang: string,
  { annotationPrefix }: { annotationPrefix: string },
) {
  const extractor = (comment: string) => {
    // const regex = /\s*(!?[\w-]+)?(\([^\)]*\)|\[[^\]]*\])?(.*)$/
    const regex = new RegExp(
      `\\s*(${annotationPrefix}?[\\w-]+)?(\\([^\\)]*\\)|\\[[^\\]]*\\])?(.*)$`,
    )

    const match = comment.match(regex)
    if (!match) {
      return null
    }
    const name = match[1]
    const rangeString = match[2]
    const query = match[3]?.trim()
    if (!name || !name.startsWith(annotationPrefix)) {
      return null
    }

    return {
      name: name.slice(annotationPrefix.length),
      rangeString,
      query,
    }
  }

  return extractAnnotations(code, lang, extractor)
}

async function extractLineAnnotations(code: string) {
  const annotations = code.split("\n").map((line, i) => ({
    name: "Line",
    query: `${i + 1}`,
    ranges: [
      {
        fromLineNumber: i + 1,
        toLineNumber: i + 1,
      },
    ],
  }))
  return { code, annotations }
}

// async function extractTwoSlashAnnotations(code: string, lang: string) {
//   if (lang !== "ts") {
//     return { code, annotations: [] }
//   }
//   const settings = {}
//   const result = twoslasher(code, lang, settings)
//   const { staticQuickInfos, queries } = result
//   console.log(queries)
//   const output = {
//     code: result.code,
//     annotations: [
//       ...staticQuickInfos.map(infoToAnnotation),
//       ...queries.map(queryToAnnotation),
//     ],
//   }
//   return output
// }

// function infoToAnnotation({
//   text,
//   line,
//   character,
//   length,
// }: TwoSlashReturn["staticQuickInfos"][0]): Annotation {
//   return {
//     name: "TypeInfo",
//     query: text,
//     ranges: [
//       {
//         lineNumber: line + 1,
//         fromColumn: character + 1,
//         toColumn: character + length,
//       },
//     ],
//   }
// }

// function queryToAnnotation({
//   text,
//   line,
//   offset,
// }: TwoSlashReturn["queries"][0]): Annotation {
//   return {
//     name: "TypeQuery",
//     query: offset + " " + text,
//     ranges: [
//       {
//         fromLineNumber: line,
//         toLineNumber: line,
//       },
//     ],
//   }
// }
