/*@jsxRuntime automatic @jsxImportSource react*/
import { Code } from "../../src/code"
function _createMdxContent(props) {
  return (
    <>
      <style>
        {
          "[data-ch-theme=github-dark] {  --ch-t-colorScheme: dark;--ch-t-foreground: #c9d1d9;--ch-t-background: #0d1117;--ch-t-lighter-inlineBackground: #0d1117e6;--ch-t-editor-background: #0d1117;--ch-t-editor-foreground: #c9d1d9;--ch-t-editor-lineHighlightBackground: #6e76811a;--ch-t-editor-rangeHighlightBackground: #ffffff0b;--ch-t-editor-infoForeground: #3794FF;--ch-t-editor-selectionBackground: #264F78;--ch-t-focusBorder: #1f6feb;--ch-t-tab-activeBackground: #0d1117;--ch-t-tab-activeForeground: #c9d1d9;--ch-t-tab-inactiveBackground: #010409;--ch-t-tab-inactiveForeground: #8b949e;--ch-t-tab-border: #30363d;--ch-t-tab-activeBorder: #0d1117;--ch-t-tab-activeBorderTop: #f78166;--ch-t-editorGroup-border: #30363d;--ch-t-editorGroupHeader-tabsBackground: #010409;--ch-t-editorLineNumber-foreground: #6e7681;--ch-t-input-background: #0d1117;--ch-t-input-foreground: #c9d1d9;--ch-t-input-border: #30363d;--ch-t-icon-foreground: #8b949e;--ch-t-sideBar-background: #010409;--ch-t-sideBar-foreground: #c9d1d9;--ch-t-sideBar-border: #30363d;--ch-t-list-activeSelectionBackground: #6e768166;--ch-t-list-activeSelectionForeground: #c9d1d9;--ch-t-list-hoverBackground: #6e76811a;--ch-t-list-hoverForeground: #c9d1d9; } [data-ch-theme=github-dark] ::selection {background-color: var(--ch-t-editor-selectionBackground);color: inherit;}"
        }
      </style>
      {"\n"}
      {"\n"}
      <Code
        foo="bar"
        config={{
          themeName: "github-dark",
        }}
        codeblocks={[
          {
            lang: "js",
            meta: "index.js",
            value: 'const foo = "foo"\nconst bar = "bar"',
            annotations: [
              {
                name: "Line",
                query: "1",
                ranges: [
                  {
                    fromLineNumber: 1,
                    toLineNumber: 1,
                  },
                ],
              },
              {
                name: "Line",
                query: "2",
                ranges: [
                  {
                    fromLineNumber: 2,
                    toLineNumber: 2,
                  },
                ],
              },
              {
                name: "Line",
                query: "3",
                ranges: [
                  {
                    fromLineNumber: 3,
                    toLineNumber: 3,
                  },
                ],
              },
              {
                name: "Foo",
                query: "bar",
                ranges: [
                  {
                    fromLineNumber: 2,
                    toLineNumber: 2,
                  },
                ],
              },
            ],
          },
          {
            lang: "html",
            meta: "foo",
            value: "<div>bar</div>",
            annotations: [
              {
                name: "Line",
                query: "1",
                ranges: [
                  {
                    fromLineNumber: 1,
                    toLineNumber: 1,
                  },
                ],
              },
            ],
          },
        ]}
        components={{
          ...(typeof _provideComponents === "function" && _provideComponents()),
          ...props.components,
          ...(typeof Line !== "undefined" && {
            Line,
          }),
          ...(typeof Foo !== "undefined" && {
            Foo,
          }),
        }}
      />
      {"\n"}
      <Code
        config={{
          themeName: "github-dark",
        }}
        codeblocks={[
          {
            lang: "js",
            meta: "foo",
            value: 'const foo = "foo"\nconst bar = "bar"',
            annotations: [
              {
                name: "Line",
                query: "1",
                ranges: [
                  {
                    fromLineNumber: 1,
                    toLineNumber: 1,
                  },
                ],
              },
              {
                name: "Line",
                query: "2",
                ranges: [
                  {
                    fromLineNumber: 2,
                    toLineNumber: 2,
                  },
                ],
              },
            ],
          },
        ]}
        components={{
          ...(typeof _provideComponents === "function" && _provideComponents()),
          ...props.components,
          ...(typeof Line !== "undefined" && {
            Line,
          }),
        }}
      />
    </>
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
