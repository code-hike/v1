import {
  HighlightedCode,
  Pre,
  LineAnnotationComponent,
  LineComponent,
} from "codehike/code"

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
    <div className="opacity-50 data-[focus]:opacity-100 transition-opacity px-2">
      {children}
    </div>
  )
}
