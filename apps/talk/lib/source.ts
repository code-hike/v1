import fs from "fs"
import path from "path"

export type Slide = {
  children: React.ReactNode
  notes: React.ReactNode
}

export async function getAllSlides(section?: string) {
  if (section) {
    const { slides } = await import(`@/content/${section}/index`)
    return slides as Slide[]
  }

  const content = path.join(process.cwd(), "content")
  const dirs = await fs.promises.readdir(content)
  const promises = dirs.map(async (dir) => {
    const { slides } = await import(`@/content/${dir}/index`)
    return slides
  })

  const slides = (await Promise.all(promises)).flatMap((a) => a)
  return slides as Slide[]
}

export async function getSectionNames() {
  const content = path.join(process.cwd(), "content")
  const dirs = await fs.promises.readdir(content)
  return dirs
}
