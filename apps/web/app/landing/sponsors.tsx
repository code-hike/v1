import fs from "fs/promises"
import GHLogo from "./logo.github.png"
import GHText from "./text.github.png"
import MetaLogo from "./logo.meta.png"
import DrivlyLogo from "./logo.drivly.png"
import UidevLogo from "./logo.uidev.svg"
import Image from "next/image"
import Link from "next/link"
import sponsorData from "./sponsors.json"

export function TopSponsors({ title = "Top Sponsors", scale = 1 }) {
  // const sponsors = JSON.parse(
  //   await fs.readFile("./sponsors/sponsors.json", "utf-8"),
  // )

  // const top = sponsors.slice(0, 4)
  // const middle = sponsors.slice(4, 20)
  // const bottom = sponsors.slice(20)
  return (
    <section className="">
      <h3 className="text-center pb-4 text-primary/60 text-md">{title}</h3>
      <div className="flex gap-4 pb-8 justify-center invert dark:invert-0">
        <a
          className="overflow-hidden flex p-2 items-center gap-1  cursor-pointer opacity-80 hover:opacity-100"
          href="https://github.blog/2023-04-12-github-accelerator-our-first-cohort-and-whats-next/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={GHLogo} alt="GitHub" height={36 * scale} />
          <Image src={GHText} alt="GitHub" height={36 * scale} />
        </a>
        <a
          className="overflow-hidden flex p-2 items-center gap-1  cursor-pointer opacity-80 hover:opacity-100"
          href="https://opensource.fb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={MetaLogo} alt="Meta" height={36 * scale} />
        </a>
        <a
          className="overflow-hidden flex p-2 items-center gap-1  cursor-pointer opacity-80 hover:opacity-100"
          href="https://ui.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={UidevLogo} alt="ui.dev" height={28 * scale} />
          <span className="text-2xl text-white">ui.dev</span>
        </a>
        <a
          className="overflow-hidden flex p-2 items-center gap-1  cursor-pointer opacity-80 hover:opacity-100"
          href="https://driv.ly/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={DrivlyLogo} alt="Drivly" height={48 * scale} />
        </a>
      </div>
    </section>
  )
}

export async function AllSponsors() {
  const sponsors = sponsorData.filter(
    (s: any) => !["drivly", "uidotdev", "github", "facebook"].includes(s.name),
  )

  return (
    <section className="not-prose max-w-3xl w-full mx-auto">
      <TopSponsors title="Sponsors" scale={1.1} />
      <Row sponsors={sponsors.slice(0, 10)} size={66} delay={0.1} />
      <Row sponsors={sponsors.slice(10, 20)} size={66} delay={0.2} />
      <Row sponsors={sponsors.slice(20, 35)} size={42} delay={0.3} />
      <Row sponsors={sponsors.slice(35, 50)} size={42} delay={0.4} />
      <Row sponsors={sponsors.slice(50, 70)} size={32} delay={0.5} />
      <Row sponsors={sponsors.slice(70, 90)} size={32} delay={0.6} />
      <Row sponsors={sponsors.slice(90, 110)} size={32} delay={0.7} />

      <Link
        href="https://github.com/sponsors/code-hike"
        className="block border text-primary border-primary/50 rounded p-2 w-48 mx-auto mt-4 text-center hover:border-primary transition-colors"
      >
        Sponsor Code Hike
      </Link>
    </section>
  )
}

function Row({
  sponsors,
  size,
  delay = 0,
}: {
  sponsors: any[]
  size: number
  delay?: number
}) {
  return (
    <div
      className="flex flex-row flex-wrap justify-between pb-2 w-full"
      style={{ "--delay": delay + "s" } as any}
    >
      {sponsors.map((s: any, i) => (
        <img
          className="sponsor rounded hover:grayscale-0 opacity-100 hover:opacity-100 transition-all duration-150 cursor-pointer"
          src={`https://github.com/${s.name}.png`}
          alt={s.name}
          height={size}
          width={size}
          key={i}
        />
      ))}
    </div>
  )
}
