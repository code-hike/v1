import { diffArrays } from "diff"

// Returns a list of [a, b], where a is the index of the item in the first array
// and b is the index of the item in the second array.
// only returns indices of items that are in both arrays.
export function diffList<T>(a: T[], b: T[]): [number, number][] {
  const result = diffArrays(a, b)
  const list: [number, number][] = []

  let ai = 0
  let bi = 0

  result.forEach(({ count, added, removed }) => {
    if (added) {
      bi += count!
    } else if (removed) {
      ai += count!
    } else {
      for (let i = 0; i < count!; i++) {
        list.push([ai++, bi++])
      }
    }
  })

  return list
}
