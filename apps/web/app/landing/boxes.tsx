import Link from "next/link"
import { cn } from "../../lib/utils"

export function Boxes({ className }: { className?: string }) {
  return (
    <Placeholder className={className} />
    // <div className={cn("grid grid-cols-2 gap-3", className)}>
    //   <StructuredContent className="col-span-2" />

    //   <Box className="flex flex-col justify-evenly items-center ">
    //     <h2
    //       className="text-2xl font-bold px-4 text-center"
    //       style={{ textWrap: "pretty" }}
    //     >
    //       Codeblocks are first class citizens
    //     </h2>
    //   </Box>
    //   <Box className="flex flex-col justify-evenly items-center ">
    //     <h2 className="text-2xl font-bold px-4 text-center">
    //       Copy 🡒 Paste 🡒 <br />
    //       Make it yours
    //     </h2>
    //     <ul>
    //       <li>Codeblocks</li>
    //       <li>Code Annotations</li>
    //       <li>Layouts</li>
    //     </ul>
    //   </Box>
    // </div>
  )
}

function Placeholder({ className }: { className?: string }) {
  return (
    <Box
      className={cn(
        "w-full h-96 bg-primary/10 flex flex-col justify-evenly items-center md:rounded-lg  mb-16 text-primary/60",
        className,
      )}
    >
      TODO: Code Hike visualization
      <ButtonLink
        href="docs/components/scrollycoding"
        className="mx-auto w-36 block"
      >
        See it in action
      </ButtonLink>
    </Box>
  )
}

function Box({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-700/50 h-72 w-full  rounded-xl hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors",
        className,
      )}
    >
      {children}
    </div>
  )
}

function StructuredContent({ className }: { className?: string }) {
  return (
    <Box className={cn("flex justify-evenly items-center", className)}>
      <pre className="text-[10px]">{mdx}</pre>
      <h2 className="text-2xl font-bold text-center">
        Looks like Markdown
        <br /> Feels like JSON
      </h2>
      <div className="border border-zinc-500/50 w-40 h-56 rounded p-2">
        <div className="border border-zinc-500/50 w-16 h-6 rounded p-2 mb-2" />
        <div className="border border-zinc-500/50 w-16 h-6 rounded p-2 mb-2" />
        <div className="border border-zinc-500/50 w-16 h-6 rounded p-2 mb-2" />
        <div className="border border-zinc-500/50 w-16 h-6 rounded p-2 mb-2" />
      </div>
    </Box>
  )
}

function ButtonLink({
  href,
  children,
  className,
}: {
  className?: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={
        "border border-primary/50 rounded p-2 text-center hover:border-primary transition-colors " +
        className
      }
    >
      {children}
    </Link>
  )
}

const mdx = `# !foo bar

lorem ipsum

## !bar bax

lorem ipsum

## !bar bax

lorem ipsum`
