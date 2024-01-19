import Link from "next/link"
import { blog } from "../source"

export default function BlogIndex() {
  const pages = blog.getPages()

  const sortedPages = pages.sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime()
  })

  return (
    <main className="">
      {/* <div className="absolute inset-0 right-[50vw] flex justify-center items-center -z-10 bg-pink-900">
        <h1>Blog</h1>
      </div> */}
      <div className="max-w-md mx-auto my-12">
        <h1 className="p-4 text-3xl mb-16 font-bold">Code Hike's Blog</h1>
        {sortedPages.map(({ url, data }) => (
          <Link
            href={url}
            key={url}
            className="mb-8 block hover:bg-primary/10 p-4 rounded-md"
          >
            <h3 className="text-sm text-zinc-600 dark:text-zinc-400">
              {data.date.toDateString().slice(4)}
            </h3>
            <h2 className="text-xl font-bold">{data.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {data.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}

export function generateMetadata() {
  return {
    title: "Blog | Code Hike",
    description: "Code Hike's blog",
  }
}
