import Demo from "@/demos/word-wrap/page"
import { AnnotationComponents, Pre, RawCode, highlight } from "codehike/code"

export default function Page() {
  return (
    <Code
      codeblock={{
        value: `console.log(1)
// !WordWrap
console.log(2)`,
        lang: "js",
        meta: "",
      }}
    />
  )
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return <Pre code={highlighted} components={[wordWrap, foo]} />
}

const wordWrap: AnnotationComponents = {
  name: "WordWrap",
  AnnotatedLine: ({ InnerLine, annotation, ...props }) => (
    <InnerLine base={props} className="bg-blue-800" />
  ),
  Line: ({ InnerLine, ...props }) => (
    <InnerLine base={props} className="border border-red-100" />
  ),
}

const foo: AnnotationComponents = {
  name: "Foo",
  AnnotatedLine: ({ InnerLine, annotation, ...props }) => (
    <InnerLine {...props} className="bg-blue-800" />
  ),
  Line: ({ InnerLine, ...props }) => (
    <div>
      <InnerLine base={props} className="mx-auto w-80" />
    </div>
  ),
}
