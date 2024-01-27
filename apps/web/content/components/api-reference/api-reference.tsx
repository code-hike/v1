import {
  CodeBlock,
  CodeContent,
  HikeSection,
} from "codehike"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible"
import { z } from "../../../ui/z"

const HikeSchema = z.hike({
  main: z.section({
    steps: z.sections({
      steps: z.optional(z.sections({})),
    }),
  }),
  extra: z.section({
    steps: z.sections({}),
  }),
  returns: z.optional(z.section({})),
  code: z.codeblock(),
})

export async function APIReference({
  hike,
}: {
  hike: HikeSection
}) {
  const data = HikeSchema.parse(hike)

  const { main, extra, returns, code } = data

  return (
    <div className="relative flex flex-row gap-12 mb-24">
      <div className="flex-1">
        {/* Main Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">
            {main.query}
          </h3>
          {main.steps.map((property, i) => (
            <Property property={property} key={i} />
          ))}
        </section>
        {/* Extra Properties */}
        <section>
          <h3 className="mt-8 border-b border-zinc-700">
            {extra.query}
          </h3>
          {extra.steps.map((property, i) => (
            <CollapsibleProperty
              property={property}
              key={i}
            />
          ))}
        </section>
        {/* Returns */}
        {returns && (
          <div>
            <h3 className="mt-8 border-b border-zinc-700">
              Returns
            </h3>
            {returns.children}
          </div>
        )}
      </div>
      <div className="not-prose max-w-sm w-full">
        <div className="sticky top-16">
          <Code codeblock={code} />
        </div>
      </div>
    </div>
  )
}

function Property({ property }: { property: any }) {
  const [name, ...rest] = property.query.split(" ")
  const type = rest.join(" ")

  return (
    <div className="mb-6">
      <h4>
        <span className="font-mono">{name}</span>
        <span className="ml-2 text-sm text-slate-400">
          {type}
        </span>
      </h4>
      {property.children}
      <ChildProperties properties={property.steps} />
    </div>
  )
}

function CollapsibleProperty({
  property,
}: {
  property: any
}) {
  const [name, ...rest] = property.query.split(" ")
  const type = rest.join(" ")

  return (
    <Collapsible className="mb-4">
      <CollapsibleTrigger className="font-bold font-mono">
        <div
          className={
            "inline-block mr-1 -ml-3 " +
            "[[data-state=open]_&]:rotate-90 transform transition-transform"
          }
        >
          {">"}
        </div>
        <span>{name}</span>
        <span className="ml-2 text-sm text-slate-400">
          {type}
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {property.children}
        <ChildProperties properties={property.steps} />
      </CollapsibleContent>
    </Collapsible>
  )
}

function ChildProperties({
  properties,
}: {
  properties?: HikeSection[]
}) {
  if (!properties || properties.length === 0) return null
  return (
    <Collapsible className="rounded-xl border border-zinc-300/20 px-4 py-1">
      <CollapsibleTrigger className="select-none text-zinc-400 hover:text-zinc-50">
        <div className="[[data-state=open]_&]:hidden">
          Show child attributes
        </div>
        <div className="[[data-state=closed]_&]:hidden">
          Hide child attributes
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {properties.map((property, i) => (
          <Property property={property} key={i} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <div className="border border-zinc-300/20 rounded mb-8 bg-zinc-900">
      <div className="items-center bg-zinc-800 p-2 pl-4 text-xs flex text-zinc-100">
        <span>{codeblock.meta}</span>
      </div>
      <CodeContent
        codeblock={codeblock}
        config={{
          theme: "github-dark",
          annotationPrefix: "!",
        }}
        className="p-2 overflow-auto"
      />
    </div>
  )
}
