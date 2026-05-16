export function sortAdjacency(
  nodeIds: readonly string[]
): readonly string[] {
  return Object.freeze(
    [...nodeIds].sort((a, b) =>
      a.localeCompare(b)
    )
  )
}
