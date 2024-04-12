import {
  LineAnnotationComponent,
  LineComponent,
  Pre,
  RawCode,
  highlight,
} from "codehike/code"
import { CopyButton } from "@/components/copy-button"

export async function BasicCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <div className="border border-zinc-700 rounded overflow-hidden my-2">
      <div className="border-b border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-300 text-sm flex">
        <span>{highlighted.meta}</span>
        <CopyButton text={highlighted.code} className="ml-auto" />
      </div>
      <Pre
        code={highlighted}
        // components2={{ LineFocus, Line }}
        className="m-0 px-0 bg-transparent whitespace-pre-wrap group"
      />
    </div>
  )
}

export const LineFocus: LineAnnotationComponent = ({
  children,
  annotation,
}) => {
  return (
    <div
      data-focus={true}
      className="opacity-50 data-[focus]:opacity-100 bg-zinc-700/30 px-2"
    >
      {children}
    </div>
  )
}

export const Line: LineComponent = ({ children }) => {
  return (
    <div className="group-has-[[data-focus]]:opacity-50 data-[focus]:opacity-100 transition-opacity px-2">
      {children}
    </div>
  )
}
