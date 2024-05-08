import Link from "next/link"

export default async function Home() {
  return (
    <ul>
      <li>
        <Link href="train">Train</Link>
      </li>
      <li>
        <Link href="grid">Grid</Link>
      </li>
    </ul>
  )
}
