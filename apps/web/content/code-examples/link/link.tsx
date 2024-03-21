import { InlineAnnotationComponent } from "codehike/code"

export const InlineLink: InlineAnnotationComponent = ({
  children,
  annotation,
}) => {
  const { query } = annotation
  return <a href={query}>{children}</a>
}
