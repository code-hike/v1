/*@jsxRuntime automatic @jsxImportSource react*/
export const chConfig = {
  theme: "nord",
  themeName: "nord",
}
import { Code } from "../../src/code"
function _createMdxContent(props) {
  return (
    <>
      <style>
        {
          "[data-ch-theme=nord] {  --ch-t-colorScheme: dark;--ch-t-foreground: #d8dee9ff;--ch-t-background: #2e3440ff;--ch-t-lighter-inlineBackground: #2e3440e6;--ch-t-editor-background: #2e3440;--ch-t-editor-foreground: #d8dee9;--ch-t-editor-lineHighlightBackground: #3b4252;--ch-t-editor-rangeHighlightBackground: #434c5e52;--ch-t-editor-infoForeground: #3794FF;--ch-t-editor-selectionBackground: #434c5ecc;--ch-t-focusBorder: #3b4252;--ch-t-tab-activeBackground: #3b4252;--ch-t-tab-activeForeground: #d8dee9;--ch-t-tab-inactiveBackground: #2e3440;--ch-t-tab-inactiveForeground: #d8dee966;--ch-t-tab-border: #3b425200;--ch-t-tab-activeBorder: #88c0d000;--ch-t-tab-activeBorderTop: #88c0d000;--ch-t-editorGroup-border: #3b425201;--ch-t-editorGroupHeader-tabsBackground: #2e3440;--ch-t-editorLineNumber-foreground: #4c566a;--ch-t-input-background: #3b4252;--ch-t-input-foreground: #d8dee9;--ch-t-input-border: #3b4252;--ch-t-icon-foreground: #C5C5C5;--ch-t-sideBar-background: #2e3440;--ch-t-sideBar-foreground: #d8dee9;--ch-t-sideBar-border: #3b4252;--ch-t-list-activeSelectionBackground: #88c0d0;--ch-t-list-activeSelectionForeground: #2e3440;--ch-t-list-hoverBackground: #3b4252;--ch-t-list-hoverForeground: #eceff4; } [data-ch-theme=nord] ::selection {background-color: var(--ch-t-editor-selectionBackground);color: inherit;}"
        }
      </style>
      {"\n"}
      {"\n"}
      <Code
        foo="bar"
        config={chConfig}
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
        config={chConfig}
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
