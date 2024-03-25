"use client"

export function Callout({ Line, annotation, ...props }: any) {
  const { query } = annotation
  return (
    <div>
      <Line {...props} style={{ border: "1px solid blue" }} />
      <div>CALLLOssUT</div>
      <input />
    </div>
  )
}
