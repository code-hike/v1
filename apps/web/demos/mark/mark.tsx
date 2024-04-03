import { LineAnnotationComponent, LineComponent } from "codehike/code"

export const LineMark: LineAnnotationComponent = ({ children, annotation }) => {
  return (
    <div className="px-2 border-l-2 border-blue-400 bg-blue-400/10">
      {children}
    </div>
  )
}

export const Line: LineComponent = ({ children }) => {
  return <div className="px-2 border-l-2 border-transparent">{children}</div>
}
