import {
  CodeInfo,
  CodeRender,
  LineAnnotationComponent,
} from "codehike/code"

export function Code({ info }: { info: CodeInfo }) {
  return (
    <CodeRender info={info} components={{ LineMark }} />
  )
}

const LineMark: LineAnnotationComponent = ({
  children,
  annotation,
}) => {
  const { query } = annotation
  return <div className={query}>{children}</div>
}
