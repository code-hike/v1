console.log(1)

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
