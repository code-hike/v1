import { mergeProps } from "./merge-props.js"
import { CustomPreProps } from "./types.js"

type InnerPreProps = CustomPreProps & {
  _stack: React.ComponentType<InnerPreProps>[]
  _ref: React.RefObject<HTMLPreElement>
}

export const InnerPre = ({
  merge = {},
  ...rest
}: { merge: CustomPreProps } & CustomPreProps) => {
  const { _stack, ...result } = mergeProps(merge, rest) as InnerPreProps
  const [Next, ...stack] = _stack
  if (Next) {
    return <Next _stack={stack} {...result} />
  } else {
    const { _ref, data, ...props } = result
    return <pre {...props} ref={_ref} />
  }
}

export function getPreRef(
  props: CustomPreProps,
): React.RefObject<HTMLPreElement> {
  const p = props as InnerPreProps
  if (!p?._ref) {
    throw new Error("`getPreRef` can only be used inside `PreWithRef`")
  }
  return p?._ref
}
