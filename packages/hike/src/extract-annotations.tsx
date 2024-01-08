import { Annotation, extractAnnotations } from "@code-hike/lighter"

const extractors: AnnotationsExtractor[] = [
  // extractTwoSlashAnnotations,
  // extractLineAnnotations,
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

  // import external code if needed and re-run annotations extraction
  const fromAnnotations = annotations.filter((a) => a.name === "from")
  if (fromAnnotations.length === 1) {
    const fromData = fromAnnotations[0].query?.trim()
    const [codepath, range] = fromData?.split(/\s+/) || []
    const externalFileContent = await readFile(codepath, config.mdxPath, range)

    const { code: newCode, annotations: newAnnotations } =
      await splitAnnotationsAndCode(externalFileContent, lang, config)

    annotations = [
      ...annotations.filter((a) => a.name !== "from" && a.name !== "Line"),
      ...newAnnotations,
    ]
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

  const { code: codeWithoutComments, annotations } = await extractAnnotations(
    // TODO hack until we fix out of range annotations in lighter
    code + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
    lang,
    extractor,
  )
  return { code: codeWithoutComments.trim(), annotations }
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

async function readFile(
  externalCodePath: string,
  mdxFilePath: string,
  range: string | undefined,
) {
  const annotationContent = "from " + mdxFilePath + " " + (range || "")

  let fs, path

  try {
    fs = (await import("fs")).default
    path = (await import("path")).default
    if (!fs || !fs.readFileSync || !path || !path.resolve) {
      throw new Error("fs or path not found")
    }
  } catch (e: any) {
    e.message = `Code Hike couldn't resolve this annotation:
${annotationContent}
Looks like node "fs" and "path" modules are not available.`
    throw e
  }

  // if we don't know the path of the mdx file:
  if (mdxFilePath == null) {
    throw new Error(
      `Code Hike couldn't resolve this annotation:
  ${annotationContent}
  Someone is calling the mdx compile function without setting the path.
  Open an issue on CodeHike's repo for help.`,
    )
  }

  const dir = path.dirname(mdxFilePath)
  const absoluteCodepath = path.resolve(dir, externalCodePath)

  let content: string
  try {
    content = fs.readFileSync(absoluteCodepath, "utf8")
  } catch (e: any) {
    e.message = `Code Hike couldn't resolve this annotation:
${annotationContent}
${absoluteCodepath} doesn't exist.`
    throw e
  }

  if (range) {
    const [start, end] = range.split(":")
    const startLine = parseInt(start)
    const endLine = parseInt(end)
    if (isNaN(startLine) || isNaN(endLine)) {
      throw new Error(
        `Code Hike couldn't resolve this annotation:
${annotationContent}
The range is not valid. Should be something like:
 ${externalCodePath} 2:5`,
      )
    }
    const lines = content.split("\n")
    content = lines.slice(startLine - 1, endLine).join("\n")
  }

  return content
}
