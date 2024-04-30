/*@jsxRuntime automatic @jsxImportSource react*/
import { CodeWithNotes } from "@/components/code/code-with-notes"
function _createMdxContent(props) {
  const _components = {
      a: "a",
      code: "code",
      h2: "h2",
      li: "li",
      p: "p",
      slot: "slot",
      ul: "ul",
      ...props.components,
    },
    { Demo, MyCode } = _components
  if (!Demo) _missingMdxReference("Demo", true)
  if (!MyCode) _missingMdxReference("MyCode", true)
  return (
    <_components.slot
      __hike={{
        children: "",
        title: "",
        _data: {
          header: "",
        },
        demo: {
          children: "demo",
          title: "",
          _data: {
            header: "## !demo",
          },
        },
        implementation: {
          children: "implementation",
          title: "",
          _data: {
            header: "## !implementation",
          },
        },
      }}
    >
      <_components.slot path="">
        <>
          <_components.slot name="demo" />
          <_components.slot name="implementation" />
        </>
      </_components.slot>
      <_components.slot path="demo">
        <>
          <_components.p>
            {"Add callouts inside your code blocks."}
          </_components.p>
          <Demo name="callout" />
        </>
      </_components.slot>
      <_components.slot path="implementation">
        <>
          <CodeWithNotes
            __hike={{
              children: "",
              title: "",
              _data: {
                header: "",
              },
              code: {
                value:
                  'import { InlineAnnotation, AnnotationHandler } from "codehike/code"\r\n\r\nconst callout: AnnotationHandler = {\r\n  name: "callout",\r\n  // !callout[/transform/] transform-annotations\r\n  transform: (annotation: InlineAnnotation) => {\r\n    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation\r\n    return {\r\n      name,\r\n      query,\r\n      fromLineNumber: lineNumber,\r\n      toLineNumber: lineNumber,\r\n      // !callout[/column/] column\r\n      data: { ...data, column: (fromColumn + toColumn) / 2 },\r\n    }\r\n  },\r\n  Block: ({ annotation, children }) => {\r\n    const { column } = annotation.data\r\n    // !fold[/className="(.*?)"/gm]\r\n    return (\r\n      <>\r\n        {children}\r\n        <div\r\n          style={{ minWidth: `${column + 4}ch` }}\r\n          className="w-fit border bg-zinc-800 border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces"\r\n        >\r\n          <div\r\n            style={{ left: `${column}ch` }}\r\n            className="absolute border-l border-t border-current w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-800"\r\n          />\r\n          {annotation.query}\r\n        </div>\r\n      </>\r\n    )\r\n  },\r\n}',
                lang: "tsx",
                meta: "code.tsx",
              },
              notes: [
                {
                  children: "notes",
                  title: "transform-annotations",
                  _data: {
                    header: "## !!notes transform-annotations",
                  },
                },
                {
                  children: "notes",
                  title: "column",
                  _data: {
                    header: "## !!notes column",
                  },
                },
              ],
            }}
          >
            <_components.slot path="">
              <>
                <_components.slot name="code" />
                <_components.slot name="notes" index={0} />
                <_components.slot name="notes" index={1} />
              </>
            </_components.slot>
            <_components.slot path="notes">
              <_components.p>
                {"We need to transform the annotations from "}
                <_components.code>{"InlineAnnotation"}</_components.code>
                {" to "}
                <_components.code>{"BlockAnnotation"}</_components.code>
              </_components.p>
            </_components.slot>
            <_components.slot path="notes">
              <_components.p>
                {"This will be the position of the arrow in the callout"}
              </_components.p>
            </_components.slot>
          </CodeWithNotes>
          <_components.p>
            {"Then pass the "}
            <_components.code>{"callout"}</_components.code>
            {" handler to the "}
            <_components.code>{"Pre"}</_components.code>
            {" component:"}
          </_components.p>
          <MyCode
            codeblock={{
              value:
                'async function Code({ codeblock }: { codeblock: RawCode }) {\r\n  const highlighted = await highlight(codeblock, "github-dark")\r\n  return <Pre code={highlighted} handlers={[callout]} />\r\n}',
              lang: "tsx",
              meta: "code.tsx ln",
            }}
          />
          <_components.h2>{"Make it better"}</_components.h2>
          <_components.p>
            {"Some ways to improve the callout annotation:"}
          </_components.p>
          <_components.ul>
            {"\n"}
            <_components.li>
              {
                "add different annotations with different styles (like Warning, Error, Info, etc)"
              }
            </_components.li>
            {"\n"}
            <_components.li>
              {
                "add an option to show the callout either before or after the line"
              }
            </_components.li>
            {"\n"}
            <_components.li>
              {"put markdown inside the callout (see the "}
              <_components.a href="/docs/code/tooltip/">
                {"tooltip example"}
              </_components.a>
              {")"}
            </_components.li>
            {"\n"}
          </_components.ul>
        </>
      </_components.slot>
    </_components.slot>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
}
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  )
}
